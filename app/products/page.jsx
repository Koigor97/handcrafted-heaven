export const metadata = {
  title: "Product Page",
  description: "Welcome to the product page",
};

function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white border-b border-gray-300">
        <div className="text-2xl font-bold">Logo</div>
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <div>Cart</div>
          <div>User</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-1/4 p-4 bg-gray-100">
          {/* Filter by Category */}
          <div className="mb-6">
            <h4 className="font-bold mb-2">Filter by Category</h4>
            <ul className="space-y-2">
              <li className="cursor-pointer">Category 1</li>
              <li className="cursor-pointer">Category 2</li>
              <li className="cursor-pointer">Category 3</li>
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h4 className="font-bold mb-2">Filter by Price</h4>
            <input type="range" min="0" max="100" className="w-full" />
          </div>
        </aside>

        {/* Product Grid */}
        <section className="w-3/4 p-4 grid grid-cols-4 gap-6">
          <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">Product 1</div>
          <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">Product 2</div>
          <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">Product 3</div>
          <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">Product 4</div>
          {/* Add more product items */}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white p-4">
        <div className="flex justify-center space-x-4">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </div>
      </footer>
    </div>
  );
}

export default ProductPage;
