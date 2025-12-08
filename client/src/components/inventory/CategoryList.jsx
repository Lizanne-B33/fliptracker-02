import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import ReactPaginate from 'react-paginate';

// Category List
function CategoryList({ onSelect }) {
  const {
    items: categories,
    pageCount,
    fetchPage,
  } = usePaginatedFetch('/api/inventory/category/');

  // Group categories by product type name
  const grouped = categories.reduce((acc, cat) => {
    const ptName = cat.product_type?.name || 'Uncategorized';
    if (!acc[ptName]) acc[ptName] = [];
    acc[ptName].push(cat);
    return acc;
  }, {});

  return (
    <div className="row mt-5">
      {Object.entries(grouped).map(([ptName, cats]) => (
        <div className="col-3" key={ptName}>
          <h5 className="text-start ft-listHeadings">{ptName}</h5>
          {cats.map((c) => (
            <h6 key={c.id} className="text-start" onClick={() => onSelect(c)}>
              {c.name}
            </h6>
          ))}
        </div>
      ))}
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={(selected) => fetchPage(selected.selected + 1)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default CategoryList;
