type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer(
  props: PageContainerProps,
) {
  const { children } = props;

  return (
    <main
      style={{
        minHeight:
          'calc(100vh - 60px)',
      }}
      className="bg-gray-100 p-6"
    >
      {children}
    </main>
  );
}
