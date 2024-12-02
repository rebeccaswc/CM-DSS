"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const AuthGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessTokenData = localStorage.getItem('access_token');

    if (!accessTokenData) {
      router.push('/login');
      return;
    }

    const { token, expiry } = JSON.parse(accessTokenData);
    const now = new Date().getTime();

    if (!token || now > expiry) {
      // 如果 token 不存在或已過期，清除 localStorage 並跳轉到 login 頁面
      localStorage.removeItem('access_token');
      router.push('/login');
    }
  }, [router]);

  return children;
};

export default AuthGuard;
