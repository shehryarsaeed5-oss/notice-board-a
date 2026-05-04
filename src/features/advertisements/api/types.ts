export const ADVERTISEMENT_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;
export type AdvertisementMediaType = 'IMAGE' | 'VIDEO';

export type AdvertisementStatus = (typeof ADVERTISEMENT_STATUSES)[number];

export interface AdvertisementRecord {
  id: string;
  title: string;
  contactPerson: string | null;
  phone: string | null;
  mediaUrl: string | null;
  mediaType: 'IMAGE' | 'VIDEO' | null;
  duration: number | null;
  sortOrder: number;
  contractAmount: number | null;
  adLocation: string | null;
  remarks: string | null;
  status: AdvertisementStatus;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdvertisementFormValues {
  title: string;
  contactPerson?: string;
  phone?: string;
  contractAmount?: number | '' | null;
  adLocation?: string;
  remarks?: string;
  duration?: number | '' | null;
  sortOrder?: number | '' | null;
  startAt?: string;
  endAt?: string;
  status: AdvertisementStatus;
}

export interface AdvertisementListFilters {
  search?: string;
  status?: AdvertisementStatus;
}

export interface AdvertisementListResult {
  advertisements: AdvertisementRecord[];
  total: number;
}
