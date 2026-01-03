import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath={location.pathname} />
      {children}
    </div>
  );
}
