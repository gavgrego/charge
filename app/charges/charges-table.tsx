import {
  useReactTable,
  TableOptions,
  ColumnDef,
  createColumnHelper,
  Table,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Charge } from "../data/hooks/useCharges";

type RowCharge = {
  onDelete: () => void;
} & Charge;

type ChargesTableProps = {
  data: Charge[];
};

const ChargesTable = ({ data }: ChargesTableProps) => {
  const columnHelper = createColumnHelper<Charge>();

  // const formattedRowData = {onDelete: () => }

  // Make some columns!
  const defaultColumns = [
    // Accessor Column
    columnHelper.accessor("attributes.date", {
      id: "date",
      cell: (info) => info.getValue(),
      header: () => <span>Date</span>,
    }),
    // Accessor Column
    columnHelper.accessor("attributes.description", {
      id: "description",
      cell: (info) => info.getValue(),
      header: () => <span>Description</span>,
    }),
    columnHelper.accessor("attributes.amount", {
      id: "amount",
      cell: (info) => info.getValue(),
      header: () => <span>Amount</span>,
    }),
  ];

  const table = useReactTable({
    columns: defaultColumns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  return (
                    <th id={header.id} key={i}>
                      {" "}
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ChargesTable;
