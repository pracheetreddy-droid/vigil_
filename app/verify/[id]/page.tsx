import React from 'react';
import { VerifyContent } from './verify-content';

export function generateStaticParams() {
  return [{ id: 'VG-284921' }];
}

export default function VerifyPortalPage({ params }: { params: { id: string } }) {
  return <VerifyContent id={params.id} />;
}
