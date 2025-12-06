// Product Type List
function ProductTypeList({ items = [], onSelect }) {
  return (
    <div className="row ft-listItems">
      {items.map((pt) => (
        <div className="col-3 text-start" key={pt.id}>
          <h6 onClick={() => onSelect(pt)}>{pt.name}</h6>
        </div>
      ))}
    </div>
  );
}
export default ProductTypeList;
