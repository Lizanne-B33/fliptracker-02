// ProductList.js
import ReactPaginate from 'react-paginate';

//=========================================
// DEFINE THE COMPONENT
//=========================================
// items: current page of items (array of objects)
// pageCount: total pages (calc by hook)
// fetchPage: loads specific page from API
// onSelect: callback to tell parent which item was clicked (editing.)

function ProductList({ items, pageCount, fetchPage, onSelect }) {
  console.log('ProductList items:', items); // debugging

  //=========================================
  // RENDERING THE LIST & PAGINATION CONTROLS
  //==========================================
  return (
    <>
      <div className="section ft-list">
        {items.map((prod) => (
          <div className="row" key={prod.id}>
            <div className="col-2">
              <img
                src={prod.prod_image} // serializer should expose product.image.url
                alt={prod.title}
                className="thumbnail"
              />
            </div>
            <div className="col-6 text-start">
              <h6 onClick={() => onSelect(prod)}>{prod.title}</h6>
            </div>
            <div className="col-2">
              <p> {prod.status} </p>
            </div>
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

export default ProductList;
