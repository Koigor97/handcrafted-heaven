export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh]	flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-black text-white font-medium rounded-md"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
}
