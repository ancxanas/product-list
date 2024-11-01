import { Product } from "../../types/product";

interface ProductTableViewProps {
  products: Product[];
}

const ProductTableView: React.FC<ProductTableViewProps> = ({ products }) => {
  return (
    <div className="product-table-view">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Category</th>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-table-image"
                />
              </td>
              <td>{product.category.toUpperCase()}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </td>
              <td>
                <button
                  onClick={handleShowDetails}
                  className="product-show-details"
                >
                  Show Details
                </button>
                <ProductModal
                  isOpen={isModalOpen}
                  onRequestClose={handleCloseModal}
                  product={product}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTableView;
