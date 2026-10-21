import { Donation } from './donation.model';
import { DonorEvent } from './event.model';

export enum FamilyStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed'
}

export interface Donor {
  id: string;
  fullName: string;
  birthdate: string | null;
  email: string;
  phoneNumber: string;
  country: string | null;
  city: string | null;
  location: string | null;
  fullAddress: string | null;
  familyStatus: FamilyStatus;
  numberOfKids: number;
  createdAt: string;
  updatedAt: string;
  donations: Donation[];
  events: DonorEvent[];
}

export interface CreateDonorRequest {
  fullName: string;
  birthdate: string | null;
  email: string;
  phoneNumber: string;
  country: string | null;
  city: string | null;
  location: string | null;
  fullAddress: string | null;
  familyStatus: FamilyStatus;
  numberOfKids: number;
}

export interface UpdateDonorRequest {
  fullName: string;
  birthdate: string | null;
  email: string;
  phoneNumber: string;
  country: string | null;
  city: string | null;
  location: string | null;
  fullAddress: string | null;
  familyStatus: FamilyStatus;
  numberOfKids: number;
}

export interface DonorSearchFilter {
  query?: string;
  familyStatus?: FamilyStatus;
  location?: string;
  minAmount?: number;
  maxAmount?: number;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}
