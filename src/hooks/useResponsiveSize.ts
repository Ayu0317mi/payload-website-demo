'use client';

import { useEffect, useState } from 'react';

// Custom hook to provide responsive sizes for media
export function useResponsiveSize() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  // Helper function to get aspect ratio based on screen size
  const getAspectRatio = (): string => {
    if (windowWidth < 640) return '16/9'; // mobile
    if (windowWidth < 1024) return '18/9'; // tablet
    return '21/9'; // desktop
  };

  return {
    windowWidth,
    getAspectRatio,
    isMobile: windowWidth < 640,
    isTablet: windowWidth >= 640 && windowWidth < 1024,
    isDesktop: windowWidth >= 1024,
  };
}