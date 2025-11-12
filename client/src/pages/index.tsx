import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the landing page
    router.push('/landing');
  }, [router]);

  return null; // This will be a quick redirect, so no need for content
}
