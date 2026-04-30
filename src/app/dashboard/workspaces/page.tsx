import PageContainer from '@/components/layout/page-container';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';

export default function WorkspacesPage() {
  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Workspace management will be added in a later phase.'
    >
      <Alert>
        <Icons.info className='h-4 w-4' />
        <AlertDescription>
          This route is reserved for a future admin workflow. Local auth is now active, but
          workspace features are intentionally untouched for phase 1.
        </AlertDescription>
      </Alert>
    </PageContainer>
  );
}
