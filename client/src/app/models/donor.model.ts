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
  firstName: string | null;
  lastName: string | null;
  spouseName: string | null;
  birthdate: string | null;
  email: string;
  phoneNumber: string;
  homePhone: string | null;
  cellPhone: string | null;
  workPhone: string | null;
  generalNotes: string | null;
  country: string | null;
  city: string | null;
  location: string | null;
  fullAddress: string | null;
  familyStatus: FamilyStatus | null;
  numberOfKids: number;
  createdAt: string;
  updatedAt: string;
  donations: Donation[];
  events: DonorEvent[];
}

export interface CreateDonorRequest {
  fullName: string;
  firstName: string | null;
  lastName: string | null;
  spouseName: string | null;
  birthdate: string | null;
  email: string;
  phoneNumber: string;
  homePhone: string | null;
  cellPhone: string | null;
  workPhone: string | null;
  generalNotes: string | null;
  country: string | null;
  city: string | null;
  location: string | null;
  fullAddress: string | null;
  familyStatus: FamilyStatus | null;
  numberOfKids: number;
}

export interface UpdateDonorRequest {
  fullName: string;
  firstName: string | null;
  lastName: string | null;
  spouseName: string | null;
  birthdate: string | null;
  email: string;
  phoneNumber: string;
  homePhone: string | null;
  cellPhone: string | null;
  workPhone: string | null;
  generalNotes: string | null;
  country: string | null;
  city: string | null;
  location: string | null;
  fullAddress: string | null;
  familyStatus: FamilyStatus | null;
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
