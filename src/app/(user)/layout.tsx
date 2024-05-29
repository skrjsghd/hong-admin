export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      {children}
    </main>
  );
}
