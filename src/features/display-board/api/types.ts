import type { DisplayPageRecord } from '@/features/display-pages/api/types';
import type { AttendanceStatus } from '@/features/attendance/api/types';
import type {
  AdvertisementMediaType,
  AdvertisementStatus
} from '@/features/advertisements/api/types';
import type { AlertType } from '@/features/alerts/api/types';
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
  contactPerson: string | null;
  phone: string | null;
  contractAmount: number | null;
  adLocation: string | null;
  remarks: string | null;
  mediaUrl?: string | null;
  mediaType?: AdvertisementMediaType | null;
  duration?: number | null;
  sortOrder?: number;
  status: AdvertisementStatus;
  startAt: Date | null;
  endAt: Date | null;
}

export interface DisplayBoardAlertItem {
  id: string;
  title: string;
  message: string | null;
  alertType: AlertType;
  priority: number;
  startAt: Date;
  endAt: Date;
  status: RecordStatus;
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

export interface DisplayBoardConcessionPriceItem {
  id: string;
  itemName: string;
  category: string | null;
  price: number;
  sortOrder: number;
  status: RecordStatus;
}

export interface DisplayBoardAttendanceStaffItem {
  id: string;
  name: string;
  designation: string;
  department: string | null;
  sortOrder: number;
  shift: string | null;
  status: AttendanceStatus;
  remarks: string | null;
}

export interface DisplayBoardAttendanceManagerItem {
  id: string;
  name: string;
  designation: string | null;
  sortOrder: number;
  shift: string | null;
  status: AttendanceStatus;
  remarks: string | null;
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
  alerts: {
    items: DisplayBoardAlertItem[];
    total: number;
  };
  salesTargets: {
    items: DisplayBoardSalesTargetItem[];
    total: number;
  };
  concessionPriceList: {
    items: DisplayBoardConcessionPriceItem[];
    total: number;
  };
  attendance: {
    staff: {
      items: DisplayBoardAttendanceStaffItem[];
      total: number;
    };
    managers: {
      items: DisplayBoardAttendanceManagerItem[];
      total: number;
    };
  };
  weatherSetting: DisplayBoardWeatherSetting | null;
  attendanceSummary: DisplayBoardAttendanceSummary;
}

export type DisplayBoardAvailability = 'active' | 'inactive' | 'not_found';

export interface DisplayBoardResult {
  availability: DisplayBoardAvailability;
  data: DisplayBoardData | null;
}
