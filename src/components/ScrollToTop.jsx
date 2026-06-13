import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}