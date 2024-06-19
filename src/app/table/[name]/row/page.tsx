import { getTableColumnInformation } from "@/actions/query";
import { UpdateRowForm } from "@/components/_table/update-row-form";
import { BackButton } from "@/components/back-button";

export default async function UpdateRowPage({
  params,
}: {
  params: { name: string };
}) {
  const tableName = params.name;
  const columnInformation = await getTableColumnInformation(tableName);

  return (
    <div className="flex h-full flex-col">
      <BackButton className="fixed left-6 top-6">back</BackButton>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col border-x px-4">
        <h1 className="py-4 text-xl font-semibold">{tableName}</h1>
        <UpdateRowForm
          tableName={tableName}
          columnInformation={columnInformation}
        />
      </main>
    </div>
  );
}
