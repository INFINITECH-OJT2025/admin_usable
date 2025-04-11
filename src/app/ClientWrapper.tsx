"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "@/app/assets/css/dark-mode.css";
import CircularLoader from "@/app/Components/Admin/CircularLoader";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true); // Start by showing the loader

  useEffect(() => {
    // Show loader when route changes
    setLoading(true);
    
    // Make sure the loader stays visible for at least 500ms
    const timeout = setTimeout(() => setLoading(false), 1000); // 500ms delay for loader to show before transitioning
    
    // Cleanup timeout on route change completion
    return () => clearTimeout(timeout);
  }, [pathname]); // When the pathname changes, trigger the loader
  
  return <>{loading ? <CircularLoader /> : children}</>;
}