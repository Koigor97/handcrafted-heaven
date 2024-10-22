import Product from "../common/Product";

export default function ProductGrid({ products }) {
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-custom-clamp2 mx-auto">
      {products.map((product) => (
        <Product
          key={product.product_id}
          id={product.product_id}
          image={product.image_url}
          name={product.name}
          price={product.price}
          quantity={product.quantity_in_stock}
        />
      ))}
    </div>
  );
}
