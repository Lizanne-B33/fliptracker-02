// Product Type List
function ProductTypeList({ ProductType = [], onSelect }) {
  return (
    <ul>
      {Array.isArray(ProductType) &&
        ProductType.map((pt) => (
          <li key={pt.id} onClick={() => onSelect(pt)}>
            {pt.name}
          </li>
        ))}
    </ul>
  );
}
export default ProductTypeList;
