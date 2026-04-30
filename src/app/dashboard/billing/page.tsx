import PageContainer from '@/components/layout/page-container';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';

export default function BillingPage() {
  return (
    <PageContainer
      pageTitle='Billing & Plans'
      pageDescription='Billing will be added after the core admin flow is complete.'
    >
      <Alert>
        <Icons.info className='h-4 w-4' />
        <AlertDescription>
          Subscription and payment management are intentionally deferred until the auth phase is
          finished.
        </AlertDescription>
      </Alert>
    </PageContainer>
  );
}
