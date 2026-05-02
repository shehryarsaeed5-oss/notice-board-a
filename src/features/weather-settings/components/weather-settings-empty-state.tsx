import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherSettingFormSheetTrigger } from './weather-setting-form-sheet';

export function WeatherSettingsEmptyState() {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>No weather setting configured</CardDescription>
        <CardTitle>Start with one active configuration</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <p className='text-muted-foreground max-w-2xl text-sm'>
          Add a weather setting to define the city, provider, and whether the feed is enabled for
          the dashboard.
        </p>
        <div className='shrink-0'>
          <WeatherSettingFormSheetTrigger />
        </div>
      </CardContent>
    </Card>
  );
}
