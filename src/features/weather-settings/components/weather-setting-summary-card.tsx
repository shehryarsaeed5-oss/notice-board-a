import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { badgeToneClass } from '@/lib/status-badge';
import type { WeatherSettingRecord } from '../api/types';

interface WeatherSettingSummaryCardProps {
  weatherSetting: WeatherSettingRecord;
}

function getProviderLabel(provider: WeatherSettingRecord['provider']) {
  switch (provider) {
    case 'openweather':
      return 'OpenWeather';
    case 'weatherapi':
      return 'WeatherAPI';
    case 'openmeteo':
      return 'Open-Meteo';
    default:
      return provider;
  }
}

function formatDateTime(value: Date) {
  return format(value, 'MMM d, yyyy h:mm a');
}

export function WeatherSettingSummaryCard({ weatherSetting }: WeatherSettingSummaryCardProps) {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Weather configuration</CardDescription>
        <CardTitle>{weatherSetting.city}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>City</TableCell>
                <TableCell>{weatherSetting.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Provider</TableCell>
                <TableCell>
                  <Badge variant='outline' className={badgeToneClass('info')}>
                    {getProviderLabel(weatherSetting.provider)}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>API Key</TableCell>
                <TableCell>
                  {weatherSetting.apiKey ? (
                    <Badge variant='outline' className={badgeToneClass('success')}>
                      Configured
                    </Badge>
                  ) : (
                    <span className='text-muted-foreground'>Not set</span>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Enabled</TableCell>
                <TableCell>
                  <Badge
                    variant='outline'
                    className={badgeToneClass(weatherSetting.enabled ? 'success' : 'warning')}
                  >
                    {weatherSetting.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Created</TableCell>
                <TableCell className='whitespace-nowrap'>
                  {formatDateTime(weatherSetting.createdAt)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Updated</TableCell>
                <TableCell className='whitespace-nowrap'>
                  {formatDateTime(weatherSetting.updatedAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
