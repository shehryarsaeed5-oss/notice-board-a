import type { DisplayPageRecord } from '@/features/display-pages/api/types';
import type { AttendanceStatus } from '@/features/attendance/api/types';
import type {
  AdvertisementMediaType,
  AdvertisementStatus
} from '@/features/advertisements/api/types';
import type { WeatherSettingProvider } from '@/features/weather-settings/api/types';

export type RecordStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface DisplayBoardEventItem {
  id: string;
  title: string;
  clientName: string | null;
  companyName: string | null;
  screenName: string | null;
  startAt: Date;
  endAt: Date | null;
}

export interface DisplayBoardMeetingItem {
  id: string;
  title: string;
  location: string | null;
  organizer: string | null;
  startAt: Date;
  endAt: Date | null;
}

export interface DisplayBoardMovieItem {
  id: string;
  movieName: string;
  screenName: string;
  showTime: Date;
}

export interface DisplayBoardAdvertisementItem {
  id: string;
  title: string;
  mediaUrl: string;
  mediaType: AdvertisementMediaType;
  duration: number | null;
  sortOrder: number;
  status: AdvertisementStatus;
  startAt: Date | null;
  endAt: Date | null;
}

export interface DisplayBoardSalesTargetItem {
  id: string;
  itemName: string;
  itemCode: string | null;
  dailyTarget: number | null;
  weeklyTarget: number | null;
  monthlyTarget: number | null;
  status: RecordStatus;
}

export interface DisplayBoardWeatherSetting {
  id: string;
  city: string;
  provider: WeatherSettingProvider;
  enabled: boolean;
}

export interface DisplayBoardAttendanceSummary {
  staffExpected: number;
  managerExpected: number;
  staffMarked: number;
  managerMarked: number;
  staffCounts: Record<AttendanceStatus, number>;
  managerCounts: Record<AttendanceStatus, number>;
}

export interface DisplayBoardData {
  displayPage: DisplayPageRecord;
  generatedAt: Date;
  events: {
    items: DisplayBoardEventItem[];
    total: number;
  };
  meetings: {
    items: DisplayBoardMeetingItem[];
    total: number;
  };
  movieSchedules: {
    items: DisplayBoardMovieItem[];
    total: number;
  };
  advertisements: {
    items: DisplayBoardAdvertisementItem[];
    total: number;
  };
  salesTargets: {
    items: DisplayBoardSalesTargetItem[];
    total: number;
  };
  weatherSetting: DisplayBoardWeatherSetting | null;
  attendanceSummary: DisplayBoardAttendanceSummary;
}

export type DisplayBoardAvailability = 'active' | 'inactive' | 'not_found';

export interface DisplayBoardResult {
  availability: DisplayBoardAvailability;
  data: DisplayBoardData | null;
}
