import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const ProductTable = ({ items = [], onSelect, fetchPage, currentPageUrl }) => {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const handleRemove = async (product) => {
    try {
      const response = await fetch(`/api/inventory/product/${product.id}/`, {
        method: 'PATCH', // or PUT depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'removed' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // ✅ Refresh the table data after update
      await fetchPage(currentPageUrl);
    } catch (err) {
      console.error(err);
      alert('Error removing product');
    }
  };

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: (info) => <div className="text-start">{info.getValue()}</div>,
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: (info) => (
        <div className="text-end">{formatCurrency(info.getValue())}</div>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (info) => (
        <div className="d-flex gap-2 justify-content-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onSelect(info.row.original)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleRemove(info.row.original)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: items,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      {/* Global search box */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search products..."
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

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
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No products found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
