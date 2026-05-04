import type { MovieScheduleSyncSourceType } from '../constants';

export interface MovieScheduleSyncSettingRecord {
  id: string;
  enabled: boolean;
  sourceType: MovieScheduleSyncSourceType;
  apiUrl: string;
  apiTokenSet: boolean;
  lastSyncAt: Date | null;
  lastSyncStatus: string | null;
  lastSyncMessage: string | null;
  lastSyncCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieScheduleSyncedRowRecord {
  id: string;
  sourceKey: string;
  movieName: string;
  normalizedMovieName: string | null;
  screenName: string;
  showDate: string;
  showTime: string;
  showDateTime: Date | null;
  isActive: boolean;
  syncBatchId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieScheduleSyncLogRecord {
  id: string;
  status: string;
  message: string | null;
  rowCount: number;
  startedAt: Date;
  finishedAt: Date | null;
  createdAt: Date;
}

export interface MovieScheduleSyncOverview {
  setting: MovieScheduleSyncSettingRecord;
  syncedRows: MovieScheduleSyncedRowRecord[];
  logs: MovieScheduleSyncLogRecord[];
  selectedDate: string;
}

export interface MovieScheduleSyncSettingValues {
  enabled: boolean;
  sourceType: MovieScheduleSyncSourceType;
  apiUrl?: string;
  apiToken?: string;
}

export interface MovieScheduleSyncRunValues {
  showDate: string;
}
