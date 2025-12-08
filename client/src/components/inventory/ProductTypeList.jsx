// ProductTypeList.js
// react-paginate is the library that handles rendering pages and nav controls.
import ReactPaginate from 'react-paginate';

//=========================================
// DEFINE THE COMPONENT
//=========================================
// items: current page of items (array of objects)
// pageCount: total pages (calc by hook)
// fetchPage: loads specific page from API
// onSelect: callback to tell parent which item was clicked (editing.)

function ProductTypeList({ items, pageCount, fetchPage, onSelect }) {
  console.log('ProductTypeList items:', items); // debugging

  //=========================================
  // RENDERING THE LIST & PAGINATION CONTROLS
  //==========================================
  return (
    <>
      <div className="row ft-listItems">
        {items.map((pt) => (
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
        onPageChange={(selected) => fetchPage(selected.selected + 1)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </>
  );
}

export default ProductTypeList;
