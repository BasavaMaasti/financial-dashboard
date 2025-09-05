'use client'

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

const MobileRouter = () => {
  const pathname = usePathname();
  
  useEffect(() => {
    // Handle mobile hardware back button
    if (Capacitor.isNativePlatform()) {
      const handleBackButton = () => {
        window.history.back();
        return false;
      };
      
      // Register the back button handler
      import('@capacitor/app').then(({ App }) => {
        App.addListener('backButton', handleBackButton);
      });
      
      return () => {
        import('@capacitor/app').then(({ App }) => {
          App.removeAllListeners();
        });
      };
    }
  }, [pathname]);
  
  return null;
};

export default MobileRouter;