import PageContainer from '@/components/layout/page-container';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';

export default function TeamPage() {
  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Team management will be added in a later phase.'
    >
      <Alert>
        <Icons.info className='h-4 w-4' />
        <AlertDescription>
          Team and organization controls are not part of the local auth phase yet.
        </AlertDescription>
      </Alert>
    </PageContainer>
  );
}
