// Product Type List
function CategoryList({ items = [], onSelect }) {
  // Group categories by product type name
  const grouped = items.reduce((acc, cat) => {
    const ptName = cat.product_type?.name || 'Uncategorized';
    if (!acc[ptName]) acc[ptName] = [];
    acc[ptName].push(cat);
    return acc;
  }, {});

  return (
    <div className="row mt-5">
      {Object.entries(grouped).map(([ptName, cats]) => (
        <div className="col-3" key={ptName}>
          {/* Product Type heading */}
          <h5 className="text-start ft-listHeadings">{ptName}</h5>

          {/* Categories stacked vertically in this column */}
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
