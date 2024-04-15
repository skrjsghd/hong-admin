import { ColumnInformation } from "@/lib/types";

type CollectionTableRowProps = {
  data: Record<string, string>;
  columnInformation: ColumnInformation[];
  onClick?: (params: Record<string, any>) => void;
};

function CollectionTableRow({
  data,
  columnInformation,
  onClick,
}: CollectionTableRowProps) {
  const typeParser = (
    columnName: ColumnInformation["column_name"],
    typcategory: ColumnInformation["typcategory"],
  ) => {
    const value = data[columnName];
    if (typcategory === "D") {
      return new Date(value).toISOString().split(".")[0];
    }
    return value;
  };

  const row: Record<string, any> = Object.fromEntries(
    columnInformation.map((c) => [
      c.column_name,
      typeParser(c.column_name, c.typcategory),
    ]),
  );

  const handleClick = () => {
    if (onClick) {
      onClick(row);
    }
  };

  return (
    <tr
      className="cursor-pointer divide-x hover:bg-zinc-100"
      onClick={handleClick}
    >
      {Object.entries(row).map(([k, v]) => (
        <td key={k} className="p-2">
          {v}
        </td>
      ))}
    </tr>
  );
}

export { CollectionTableRow };
