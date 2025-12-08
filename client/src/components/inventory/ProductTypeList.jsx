// ProductTypeList.js
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import ReactPaginate from 'react-paginate';

function ProductTypeList({ onSelect }) {
  // Rename items to productTypes keeps from getting confused.
  const {
    items: productTypes,
    pageCount,
    fetchPage,
  } = usePaginatedFetch('/api/inventory/product_type/');

  return (
    <>
      <div className="row ft-listItems">
        {productTypes.map((pt) => (
          <div className="col-3 text-start" key={pt.id}>
            <h6 onClick={() => onSelect(pt)}>{pt.name}</h6>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        // React-paginate starts at 0, so adding 1 for the DRF page structure.
        onPageChange={(selected) => fetchPage(selected.selected + 1)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </>
  );
}

export default ProductTypeList;
