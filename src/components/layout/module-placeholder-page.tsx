import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export interface ModulePlaceholderPageProps {
  title: string;
  description: string;
}

export default function ModulePlaceholderPage({ title, description }: ModulePlaceholderPageProps) {
  return (
    <PageContainer pageTitle={title} pageDescription={description}>
      <Card className='border-dashed'>
        <CardHeader>
          <CardDescription>Module coming in next phase</CardDescription>
          <CardTitle>Placeholder screen</CardTitle>
        </CardHeader>
        <CardContent className='text-muted-foreground flex items-start gap-3 text-sm leading-6'>
          <Icons.lock className='mt-0.5 size-4 shrink-0' />
          <span>
            This section is reserved for the full Cinema Notice Board workflow. The layout is in
            place so the module can be added without changing the dashboard shell.
          </span>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
