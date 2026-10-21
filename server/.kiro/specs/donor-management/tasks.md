# Implementation Plan: Donor Management

## Overview

Implement a full-stack Donor Management Application with an Angular frontend, C# ASP.NET Core Web API backend, and PostgreSQL database. The implementation follows a layered approach: data layer first, then business logic, API controllers, and finally the frontend. Testing is integrated at each layer.

## Tasks

- [x] 1. Set up project structure and core infrastructure
  - [x] 1.1 Create ASP.NET Core Web API project with Entity Framework Core and PostgreSQL configuration
    - Create solution with `DonorManagement.Api` project
    - Add NuGet packages: EF Core, Npgsql, FluentValidation, QuestPDF, DocumentFormat.OpenXml, JWT Bearer
    - Configure `appsettings.json` with connection string and JWT settings
    - Set up `Program.cs` with service registration and middleware pipeline
    - _Requirements: 15.1, 11.5_

  - [x] 1.2 Create Entity models, enums, and DbContext
    - Implement `Donor`, `Donation`, and `User` entities
    - Implement `FamilyStatus` and `PaymentMethod` enums
    - Create `AppDbContext` with entity configurations and relationships
    - Configure cascade delete from Donor to Donations
    - Create initial EF Core migration
    - _Requirements: 1.2, 4.2_

  - [x] 1.3 Create DTOs and mapping configuration
    - Implement request/response DTOs: `CreateDonorRequest`, `UpdateDonorRequest`, `CreateDonationRequest`, `UpdateDonationRequest`, `LoginRequest`, `LoginResponse`, `DonorResponse`, `DonationResponse`, `DashboardSummary`, `MonthlyStats`, `DonorSearchFilter`
    - Create mapping extension methods between entities and DTOs
    - _Requirements: 1.2, 4.2, 9.1-9.5_

- [x] 2. Implement authentication and authorization
  - [x] 2.1 Implement AuthService with JWT token generation and password verification
    - Create `IAuthService` and `AuthService`
    - Implement login with ASP.NET Identity password hashing (PBKDF2)
    - Generate JWT tokens with role claims
    - _Requirements: 11.1, 11.2, 11.3_

  - [x] 2.2 Configure JWT authentication middleware and role-based authorization policies
    - Register JWT Bearer authentication in `Program.cs`
    - Define authorization policies for Admin and Staff roles
    - Create `AuthController` with login endpoint
    - _Requirements: 11.4, 12.1, 12.2, 12.3, 15.1, 15.2_

  - [ ]* 2.3 Write property tests for authentication
    - **Property 20: Authentication with valid credentials succeeds**
    - **Property 21: Authentication with invalid credentials fails**
    - **Property 22: Passwords are never stored in plaintext**
    - **Validates: Requirements 11.1, 11.2, 11.3**

  - [ ]* 2.4 Write property tests for authorization
    - **Property 23: Role-based access enforcement**
    - **Property 24: Unauthenticated requests are rejected**
    - **Validates: Requirements 12.2, 12.3, 12.4, 15.1, 15.2, 15.3**

- [x] 3. Implement donor management backend
  - [x] 3.1 Implement DonorValidator with FluentValidation
    - Required fields: FullName, Email, PhoneNumber
    - Email format validation (contains @ and domain)
    - Phone format validation (digits, plus, hyphens, parentheses, spaces)
    - NumberOfKids >= 0
    - _Requirements: 1.4, 13.1, 13.2, 13.3_

  - [x] 3.2 Implement IDonorService with CRUD operations
    - Create donor with UUID generation
    - Update donor fields
    - Delete donor with cascade to donations
    - Get donor by ID with donation history
    - _Requirements: 1.1, 1.2, 2.1, 2.3, 3.1, 3.2, 3.3_

  - [x] 3.3 Implement donor search and filtering in DonorService
    - Substring search on FullName, Email, PhoneNumber
    - Filter by FamilyStatus, Location, Amount Range, Date Range
    - AND logic for combined filters
    - Pagination support
    - _Requirements: 8.1, 8.2, 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x] 3.4 Create DonorController with all endpoints
    - `GET /api/donors` with search/filter query parameters
    - `GET /api/donors/{id}` with donation history
    - `POST /api/donors` (Admin only)
    - `PUT /api/donors/{id}` (Admin only)
    - `DELETE /api/donors/{id}` (Admin only)
    - Apply `[Authorize]` attributes with role policies
    - _Requirements: 1.1, 2.1, 2.3, 3.1, 12.2, 12.3_

  - [ ]* 3.5 Write property tests for donor operations
    - **Property 1: Donor storage round-trip**
    - **Property 2: Donor validation rejects invalid input**
    - **Property 3: Donor update persistence**
    - **Property 4: Donor deletion cascades to donations**
    - **Validates: Requirements 1.1, 1.2, 1.4, 2.1, 2.3, 13.1, 13.2, 13.3**

  - [ ]* 3.6 Write property tests for search and filtering
    - **Property 13: Substring search returns matching donors**
    - **Property 14: Combined filters use AND logic**
    - **Validates: Requirements 8.1, 8.2, 9.1-9.5**

- [x] 4. Implement donation management backend
  - [x] 4.1 Implement DonationValidator with FluentValidation
    - Amount must be positive
    - Valid PaymentMethod enum value
    - Valid DonationDate
    - _Requirements: 4.5, 13.4_

  - [x] 4.2 Implement IDonationService with CRUD and receipt number generation
    - Create donation linked to donor with unique receipt number
    - Update donation fields
    - Delete donation
    - Generate unique receipt numbers (e.g., `RCP-{year}-{sequential}`)
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.3_

  - [x] 4.3 Create DonationController with all endpoints
    - `GET /api/donors/{donorId}/donations`
    - `POST /api/donors/{donorId}/donations`
    - `PUT /api/donations/{id}`
    - `DELETE /api/donations/{id}`
    - Apply authorization attributes
    - _Requirements: 4.1, 5.1, 5.3, 12.2, 12.3_

  - [ ]* 4.4 Write property tests for donation operations
    - **Property 6: Donation storage round-trip**
    - **Property 7: Receipt number uniqueness**
    - **Property 8: Donation amount validation**
    - **Property 9: Donation update persistence**
    - **Property 10: Donation deletion removes record**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.5, 5.1, 5.3, 13.4**

- [x] 5. Implement receipt generation
  - [x] 5.1 Implement PDF receipt generation with QuestPDF
    - Create `IReceiptService` and `ReceiptService`
    - Include institution info (name, logo, address, contact)
    - Include donor info (full name, address, email, phone)
    - Include donation info (amount, date, receipt number, payment method)
    - Include footer with thank-you message and signature area
    - Format for print-ready output on standard paper
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [x] 5.2 Implement Word receipt generation with DocumentFormat.OpenXml
    - Generate .docx with same content as PDF receipt
    - Include institution, donor, donation, and footer sections
    - Format for print-ready output
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 5.3 Create ReceiptController with download endpoints
    - `GET /api/donations/{donationId}/receipt/pdf`
    - `GET /api/donations/{donationId}/receipt/docx`
    - Return file download responses with correct content types
    - _Requirements: 6.1, 7.1_

  - [ ]* 5.4 Write property tests for receipt generation
    - **Property 11: PDF receipt contains required information**
    - **Property 12: Word receipt content parity with PDF**
    - **Validates: Requirements 6.1-6.4, 7.1, 7.2**

- [x] 6. Implement dashboard backend
  - [x] 6.1 Implement IDashboardService with aggregate queries
    - Total donors count
    - Total donations sum
    - Recent donations (ordered by date descending)
    - Top donors (ranked by total amount descending)
    - Monthly stats for current year (sum and count per month)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [x] 6.2 Create DashboardController with summary endpoints
    - `GET /api/dashboard/summary`
    - `GET /api/dashboard/recent-donations`
    - `GET /api/dashboard/top-donors`
    - `GET /api/dashboard/monthly-stats`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 6.3 Write property tests for dashboard
    - **Property 15: Dashboard donor count accuracy**
    - **Property 16: Dashboard donation sum accuracy**
    - **Property 17: Recent donations ordering**
    - **Property 18: Top donors ranking**
    - **Property 19: Monthly stats aggregation**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

- [x] 7. Implement global error handling and validation pipeline
  - [x] 7.1 Create global exception middleware and FluentValidation pipeline
    - Implement exception middleware returning structured error responses
    - Register FluentValidation as automatic validation pipeline
    - Map `NotFoundException` to 404, `ValidationException` to 400
    - Log errors with correlation IDs
    - _Requirements: 1.4, 4.5, 13.5, 16.4_

- [x] 8. Checkpoint - Backend complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Set up Angular frontend project
  - [x] 9.1 Create Angular project with routing, modules, and shared components
    - Initialize Angular project with routing
    - Create feature modules: Auth, Donors, Donations, Dashboard, Shared
    - Implement `NotificationService` with toast notifications
    - Implement `ConfirmDialogComponent` for deletion confirmations
    - _Requirements: 14.1, 16.1, 16.2, 16.3, 16.4_

  - [x] 9.2 Implement AuthService, AuthGuard, RoleGuard, and HTTP interceptors
    - `AuthService` with login, token storage, role checks
    - `AuthGuard` to redirect unauthenticated users
    - `RoleGuard` to block unauthorized role access
    - `AuthInterceptor` to attach JWT to requests
    - `ErrorInterceptor` to catch errors and trigger notifications
    - _Requirements: 11.4, 12.4, 15.1, 15.2_

- [x] 10. Implement donor frontend
  - [x] 10.1 Implement DonorListComponent with search and filter panel
    - Display donors in card-based layout
    - SearchBar with real-time search (name, email, phone)
    - FilterPanel with family status, location, amount range, date range
    - Sidebar filters on desktop, collapsible panel on mobile
    - Pagination controls
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 9.1-9.5, 14.2, 14.4_

  - [x] 10.2 Implement DonorCardComponent with expandable donation history
    - Display all donor fields
    - Accordion list for donation history
    - Expanded view shows amount, date, notes, payment method, receipt status
    - _Requirements: 3.1, 3.2, 3.3, 14.5_

  - [x] 10.3 Implement DonorFormComponent as modal for create/edit
    - Reactive form with all donor fields
    - Client-side validation (required fields, email format, phone format, kids >= 0)
    - Display validation errors adjacent to fields
    - Success notification on save
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 13.1, 13.2, 13.3, 13.5, 14.3, 16.1_

  - [x] 10.4 Implement donor deletion with confirmation dialog
    - Confirmation dialog before deletion
    - Cancel retains record unchanged
    - Success notification on deletion
    - _Requirements: 2.2, 2.3, 2.4_

- [x] 11. Implement donation frontend
  - [x] 11.1 Implement DonationFormComponent as modal for create/edit
    - Reactive form with amount, date, notes, payment method
    - Client-side validation (positive amount, required fields)
    - Display validation errors adjacent to fields
    - Success notification on save
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 5.1, 13.4, 13.5, 14.3, 16.2_

  - [x] 11.2 Implement donation deletion with confirmation dialog
    - Confirmation dialog before deletion
    - Cancel retains record unchanged
    - _Requirements: 5.2, 5.3, 5.4_

  - [x] 11.3 Implement ReceiptButtonComponent for PDF and Word download
    - Buttons to trigger PDF and Word receipt generation
    - Download file on success
    - Success notification on generation
    - _Requirements: 6.1, 7.1, 16.3_

- [x] 12. Implement dashboard frontend
  - [x] 12.1 Implement DashboardComponent with stats cards, recent donations, top donors, and monthly chart
    - Stats cards for total donors and total donations
    - Recent donations list (most recent first)
    - Top donors list (ranked by total amount)
    - Monthly donation chart for current year
    - Auto-refresh when data changes
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 13. Implement responsive layout
  - [x] 13.1 Apply responsive styles across all components
    - Support screen widths 320px to 2560px
    - Card-based layout for donor profiles
    - Modal forms for data entry
    - Sidebar filters on desktop, collapsible on mobile
    - Accordion panels for donation history
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [x] 14. Implement login page and route wiring
  - [x] 14.1 Implement LoginComponent with form and error handling
    - Username and password form
    - Error message on invalid credentials
    - Redirect to dashboard on success
    - _Requirements: 11.1, 11.2_

  - [x] 14.2 Wire all routes with guards and lazy-loaded modules
    - Protected routes with AuthGuard
    - Admin-only routes with RoleGuard
    - Login route accessible without auth
    - _Requirements: 11.4, 12.2, 12.3, 12.4_

- [x] 15. Final checkpoint - Full application integration
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Backend is implemented first to enable frontend development against real APIs
