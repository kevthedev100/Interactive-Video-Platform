const ViewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen m-0 p-0 bg-black">
      {children}
    </div>
  );
};

export default ViewLayout;
