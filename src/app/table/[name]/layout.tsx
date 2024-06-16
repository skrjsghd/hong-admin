export default function TableLayout({
  children,
  sidebar,
  header,
  main,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <div className="flex h-svh">
      {sidebar}
      <main className="flex w-full flex-col overflow-hidden">
        {header}
        {main}
        {children}
      </main>
    </div>
  );
}
