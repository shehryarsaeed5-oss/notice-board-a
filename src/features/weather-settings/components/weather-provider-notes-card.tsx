import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function WeatherProviderNotesCard() {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Provider notes</CardDescription>
        <CardTitle>Configuration guidance</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3 text-sm'>
        <p className='text-muted-foreground'>Open-Meteo can work without an API key.</p>
        <p className='text-muted-foreground'>
          WeatherAPI and OpenWeather usually require an API key.
        </p>
        <p className='text-muted-foreground'>
          Keep one active weather setting at a time so the dashboard has a single source of truth.
        </p>
      </CardContent>
    </Card>
  );
}
