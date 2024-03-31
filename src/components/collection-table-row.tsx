type CollectionTableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  data: Record<string, string>;
};

function CollectionTableRow({ data, ...props }: CollectionTableRowProps) {
  return (
    <tr {...props} className="cursor-pointer divide-x hover:bg-zinc-100">
      {Object.values(data).map((v) => (
        <td key={v} className="p-2">
          {v}
        </td>
      ))}
    </tr>
  );
}

export { CollectionTableRow };
