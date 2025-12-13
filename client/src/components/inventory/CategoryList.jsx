// this list shows the users what categories have been set
// in the system. The categories are grouped by Product Type.

import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import ReactPaginate from 'react-paginate';

//=========================================
// DEFINE THE COMPONENT
//=========================================
// Self-contained constructor
// fetches own data internally. It does not expect props, but
// wires them up itself.
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
    </div>
  );
}

export default CategoryList;
