import PageContainer from '@/components/layout/page-container';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ExclusivePage() {
  return (
    <PageContainer
      pageTitle='Exclusive'
      pageDescription='Exclusive/admin-only modules will be built after the auth refactor.'
    >
      <Alert>
        <Icons.lock className='h-5 w-5' />
        <AlertDescription>
          This is a placeholder for the future restricted area. It stays disabled in phase 1.
        </AlertDescription>
      </Alert>
    </PageContainer>
  );
}
