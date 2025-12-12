// This is the list that renders all the loaded Product Types.

// src/components/inventory/ProductTypeList.jsx
import ReactPaginate from 'react-paginate';

//=========================================
// DEFINE THE COMPONENT
//=========================================
// items: current page of items (array of objects)
// pageCount: total pages (calc by hook)
// fetchPage: loads specific page from API
// onSelect: callback to parent when editing an item
function ProductTypeList({ items, pageCount, fetchPage, onSelect }) {
  console.log('ProductTypeList items:', items);

  return (
    <>
      {/* LIST */}
      <div className="row ft-listItems">
        {items.length === 0 ? (
          <div className="col-12 text-center">No product types found.</div>
        ) : (
          items.map((pt) => (
            <div className="col-3 text-start" key={pt.id}>
              <h6 onClick={() => onSelect(pt)}>{pt.name}</h6>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        breakLabel={'...'}
        pageCount={Math.ceil(pageCount) || 1} // ensure integer
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selected) => fetchPage(selected.selected + 1)} // numeric page
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </>
  );
}

export default ProductTypeList;
