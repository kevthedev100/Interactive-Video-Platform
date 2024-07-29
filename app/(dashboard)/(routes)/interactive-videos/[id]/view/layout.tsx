import ViewLayout from '../../../../../view-layout';

const CustomViewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ViewLayout>
      {children}
    </ViewLayout>
  );
};

export default CustomViewLayout;
