export const ADVERTISEMENT_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;
export const ADVERTISEMENT_MEDIA_TYPES = ['IMAGE', 'VIDEO'] as const;

export type AdvertisementStatus = (typeof ADVERTISEMENT_STATUSES)[number];
export type AdvertisementMediaType = (typeof ADVERTISEMENT_MEDIA_TYPES)[number];

export interface AdvertisementRecord {
  id: string;
  title: string;
  mediaUrl: string;
  mediaType: AdvertisementMediaType;
  duration: number | null;
  sortOrder: number;
  status: AdvertisementStatus;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdvertisementFormValues {
  title: string;
  mediaUrl: string;
  mediaType: AdvertisementMediaType;
  duration?: number | '' | null;
  sortOrder?: number | '' | null;
  startAt?: string;
  endAt?: string;
  status: AdvertisementStatus;
}

export interface AdvertisementListFilters {
  search?: string;
  status?: AdvertisementStatus;
  mediaType?: AdvertisementMediaType;
}

export interface AdvertisementListResult {
  advertisements: AdvertisementRecord[];
  total: number;
}
