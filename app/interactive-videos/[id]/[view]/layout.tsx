import { ReactNode } from 'react';

interface ViewLayoutProps {
  children: ReactNode;
}

const ViewLayout = ({ children }: ViewLayoutProps) => {
  return (
    <div className="h-screen w-screen bg-black">
      {children}
    </div>
  );
};

export default ViewLayout;
