type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer(props: PageContainerProps) {
  const { children } = props;

  return (
    <main className="bg-gray-100 p-6 h-[calc(100vh-60px)] flex overflow-auto">
      {children}
    </main>
  );
}
