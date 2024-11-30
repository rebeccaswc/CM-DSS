"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const AuthGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return children;
};

export default AuthGuard;
