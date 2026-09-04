import React from 'react';
import { ProfileContent } from './profile-content';

export function generateStaticParams() {
  return [{ id: 'VG-284921' }];
}

export default function AuthorityProfilePage({ params }: { params: { id: string } }) {
  return <ProfileContent id={params.id} />;
}
