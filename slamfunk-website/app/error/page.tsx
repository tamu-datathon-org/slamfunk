import { Suspense } from 'react';
import AuthErrorClient from "./client";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorClient />
    </Suspense>
  );
}