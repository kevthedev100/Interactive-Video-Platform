const ViewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="h-screen w-screen m-0 p-0 bg-black">
        {children}
      </body>
    </html>
  );
};

export default ViewLayout;
