export default function TableLayout({
  children,
  sidebar,
  main,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <div className="flex h-svh">
      {sidebar}
      <main className="w-full">
        {main}
        {children}
      </main>
    </div>
  );
}
