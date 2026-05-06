import PageContainer from '@/components/layout/page-container';

import type { DisplayPageRecord } from '../api/types';
import { DisplayLayoutDesignerClient } from './display-layout-designer-client';

interface DisplayLayoutDesignerPageProps {
  displayPage: DisplayPageRecord;
}

export function DisplayLayoutDesignerPage({ displayPage }: DisplayLayoutDesignerPageProps) {
  return (
    <PageContainer
      pageTitle='Display Layout Designer'
      pageDescription={`Visual layout editor for ${displayPage.name}.`}
    >
      <DisplayLayoutDesignerClient displayPage={displayPage} />
    </PageContainer>
  );
}
