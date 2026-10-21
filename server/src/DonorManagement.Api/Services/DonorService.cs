using DonorManagement.Api.Data;
using DonorManagement.Api.DTOs;
using DonorManagement.Api.Exceptions;
using DonorManagement.Api.Extensions;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace DonorManagement.Api.Services;

public class DonorService : IDonorService
{
    private readonly AppDbContext _context;

    public DonorService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<DonorResponse>> SearchAsync(DonorSearchFilter filter)
    {
        var query = _context.Donors
            .Include(d => d.Donations)
            .Include(d => d.Events)
            .AsQueryable();

        // Text search on FullName, Email, PhoneNumber
        if (!string.IsNullOrWhiteSpace(filter.Query))
        {
            var searchTerm = filter.Query.ToLower();
            query = query.Where(d =>
                d.FullName.ToLower().Contains(searchTerm) ||
                d.Email.ToLower().Contains(searchTerm) ||
                d.PhoneNumber.ToLower().Contains(searchTerm));
        }

        // Family status filter
        if (filter.FamilyStatus.HasValue)
        {
            query = query.Where(d => d.FamilyStatus == filter.FamilyStatus.Value);
        }

        // Location filter (substring match on Country, City, Location)
        if (!string.IsNullOrWhiteSpace(filter.Location))
        {
            var locationTerm = filter.Location.ToLower();
            query = query.Where(d =>
                (d.Country != null && d.Country.ToLower().Contains(locationTerm)) ||
                (d.City != null && d.City.ToLower().Contains(locationTerm)) ||
                (d.Location != null && d.Location.ToLower().Contains(locationTerm)));
        }

        // Date range filter
        if (filter.FromDate.HasValue)
        {
            query = query.Where(d => d.Donations.Any(don => don.DonationDate >= filter.FromDate.Value));
        }

        if (filter.ToDate.HasValue)
        {
            query = query.Where(d => d.Donations.Any(don => don.DonationDate <= filter.ToDate.Value));
        }

        // Amount range filter — done in memory after fetching, since SQLite can't Sum decimal in SQL
        var totalCount = await query.CountAsync();

        var page = filter.Page < 1 ? 1 : filter.Page;
        var pageSize = filter.PageSize < 1 ? 10 : filter.PageSize;

        var allItems = await query
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();

        // Apply amount filters in memory
        var filteredItems = allItems.AsEnumerable();

        if (filter.MinAmount.HasValue)
            filteredItems = filteredItems.Where(d => d.Donations.Sum(don => don.Amount) >= filter.MinAmount.Value);

        if (filter.MaxAmount.HasValue)
            filteredItems = filteredItems.Where(d => d.Donations.Sum(don => don.Amount) <= filter.MaxAmount.Value);

        var filteredList = filteredItems.ToList();

        return new PagedResult<DonorResponse>
        {
            Items = filteredList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(d => d.ToResponse())
                .ToList(),
            TotalCount = filteredList.Count,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<DonorResponse?> GetByIdAsync(Guid id)
    {
        var donor = await _context.Donors
            .Include(d => d.Donations)
            .Include(d => d.Events)
            .FirstOrDefaultAsync(d => d.Id == id);

        return donor?.ToResponse();
    }

    public async Task<DonorResponse> CreateAsync(CreateDonorRequest request)
    {
        var donor = request.ToEntity();
        _context.Donors.Add(donor);
        await _context.SaveChangesAsync();

        return donor.ToResponse();
    }

    public async Task<DonorResponse?> UpdateAsync(Guid id, UpdateDonorRequest request)
    {
        var donor = await _context.Donors
            .Include(d => d.Donations)
            .Include(d => d.Events)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (donor == null)
        {
            return null;
        }

        donor.FullName = request.FullName;
        donor.Birthdate = request.Birthdate;
        donor.Email = request.Email;
        donor.PhoneNumber = request.PhoneNumber;
        donor.Country = request.Country;
        donor.City = request.City;
        donor.Location = request.Location;
        donor.FullAddress = request.FullAddress;
        donor.FamilyStatus = request.FamilyStatus;
        donor.NumberOfKids = request.NumberOfKids;
        donor.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return donor.ToResponse();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var donor = await _context.Donors.FindAsync(id);

        if (donor == null)
        {
            return false;
        }

        _context.Donors.Remove(donor);
        await _context.SaveChangesAsync();
        return true;
    }
}
