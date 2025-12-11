// src/components/inventory/ProductList.jsx
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const ProductList = ({ items, onSelect }) => {
  if (!items || items.length === 0) {
    return <p>No products found.</p>;
  }

  // Define columns
  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: (info) => (
        <span
          className="product-link"
          onClick={() => onSelect(info.row.original)}
          style={{ cursor: 'pointer' }}
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: (info) => `$${info.getValue()}`,
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (info) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onSelect(info.row.original)}
        >
          Edit
        </button>
      ),
    },
  ];

  // Table instance with sorting
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    data: items,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="table table-striped">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                style={{
                  cursor: header.column.getCanSort() ? 'pointer' : 'default',
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {/* Sorting indicator */}
                {{
                  asc: ' 🔼',
                  desc: ' 🔽',
                }[header.column.getIsSorted()] ?? null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
