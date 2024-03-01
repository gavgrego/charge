import {
  useReactTable,
  TableOptions,
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table>
        <TableHeader>
          <TableRow>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={i} className="w-[100px]">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ChargesTable;
