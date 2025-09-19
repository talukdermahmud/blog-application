"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LayoutWrapper from "@/components/LayoutWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { status } = useSession();
  const noLayoutRoutes = ["/signin"];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return noLayoutRoutes.includes(pathname) ? (
    <>{children}</>
  ) : (
    <LayoutWrapper>{children}</LayoutWrapper>
  );
};

export default ConditionalLayout;
