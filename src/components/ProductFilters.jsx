import { brands, categories, priceRanges } from '../constants/filter';

const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedAvailability,
  setSelectedAvailability,
  boxed,
  setBoxed,
  selectedPriceRange,
  setSelectedPriceRange,
}) => (
  <aside className="w-64 hidden md:block space-y-6 px-4">
    {/* Category Filter */}
    <div>
      <h3 className="font-bold mb-2">Category</h3>
      {categories.map((cat) => (
        <div key={cat}>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={selectedCategory === cat}
              onChange={() =>
                setSelectedCategory(selectedCategory === cat ? '' : cat)
              }
              className="mr-2"
            />
            {cat}
          </label>
        </div>
      ))}
      {/* Clear category */}
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="category"
          value=""
          checked={selectedCategory === ''}
          onChange={() => setSelectedCategory('')}
          className="mr-2"
        />
        All Categories
      </label>
    </div>
    {/* Brand Filter */}
    <div>
      <h3 className="font-bold mb-2">Brand</h3>
      {brands.map((brand) => (
        <div key={brand}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value={brand}
              checked={selectedBrand === brand}
              onChange={() =>
                setSelectedBrand(selectedBrand === brand ? '' : brand)
              }
              className="mr-2"
            />
            {brand}
          </label>
        </div>
      ))}
      {/* Clear brand */}
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={selectedBrand === ''}
          onChange={() => setSelectedBrand('')}
          className="mr-2"
        />
        All Brands
      </label>
    </div>
    {/* Availability */}
    <div>
      <h3 className="font-bold mb-2">Availability</h3>
      <label className="block">
        <input
          type="radio"
          name="stock"
          value="in"
          checked={selectedAvailability === 'in'}
          onChange={() =>
            setSelectedAvailability(selectedAvailability === 'in' ? '' : 'in')
          }
          className="mr-2"
        />
        In Stock
      </label>
      <label className="block">
        <input
          type="radio"
          name="stock"
          value="out"
          checked={selectedAvailability === 'out'}
          onChange={() =>
            setSelectedAvailability(selectedAvailability === 'out' ? '' : 'out')
          }
          className="mr-2"
        />
        Out of Stock
      </label>
      {/* Clear availability */}
      <label className="block">
        <input
          type="radio"
          name="stock"
          value=""
          checked={selectedAvailability === ''}
          onChange={() => setSelectedAvailability('')}
          className="mr-2"
        />
        All
      </label>
    </div>
    {/* Boxed */}
    <div>
      <h3 className="font-bold mb-2">Packaging</h3>
      <label className="block">
        <input
          type="checkbox"
          checked={boxed}
          onChange={() => setBoxed(!boxed)}
          className="mr-2"
        />
        Boxed
      </label>
      {/* Clear boxed */}
      <label className="block">
        <input
          type="checkbox"
          checked={!boxed}
          onChange={() => setBoxed(false)}
          className="mr-2"
        />
        All Packaging
      </label>
    </div>
    {/* Price Range  */}
    <div>
      <h3 className="font-bold mb-2">Price Range</h3>
      {priceRanges.map((range) => (
        <label
          key={range.label}
          className="block">
          <input
            type="radio"
            name="price"
            checked={
              selectedPriceRange &&
              selectedPriceRange[0] === range.value[0] &&
              selectedPriceRange[1] === range.value[1]
            }
            onChange={() =>
              setSelectedPriceRange(
                selectedPriceRange &&
                  selectedPriceRange[0] === range.value[0] &&
                  selectedPriceRange[1] === range.value[1]
                  ? null
                  : range.value
              )
            }
            className="mr-2"
          />
          {range.label}
        </label>
      ))}
      {/* Clear price range */}
      <label className="block">
        <input
          type="radio"
          name="price"
          checked={selectedPriceRange === null}
          onChange={() => setSelectedPriceRange(null)}
          className="mr-2"
        />
        All Prices
      </label>
    </div>
  </aside>
);
export default ProductFilters;
