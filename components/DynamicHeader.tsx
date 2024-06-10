import React from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Header from './Header';

const DynamicHeader: React.FC = () => {
  const router = useRouter();

  // Check if the pathname includes the dashboard route
  const isDashboard = router.pathname.includes('/dashboard');

  // Render Navbar if on dashboard, otherwise render Header
  return isDashboard ? <Navbar /> : <Header />;
};

export default DynamicHeader;
