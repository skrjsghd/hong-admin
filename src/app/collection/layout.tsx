import { CollectionStoreProvider } from "@/stores/collection-store-provider";

export default function CollectionPage({
  sidebar,
  table,
}: {
  sidebar: React.ReactNode;
  table: React.ReactNode;
}) {
  return (
    <CollectionStoreProvider>
      <main className="grid h-dvh grid-cols-6">
        <aside className="col-span-1 border-r border-zinc-300 px-4 py-6">
          {sidebar}
        </aside>
        <section className="col-span-5 p-8">{table}</section>
      </main>
    </CollectionStoreProvider>
  );
}
