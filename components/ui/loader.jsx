// components/LoadingSpinner.js
const LoadingSpinner = () => {
  return (
    <div className="relative w-5 h-5">
      <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-secondary1-700"></div>
    </div>
  );
};

export default LoadingSpinner;
