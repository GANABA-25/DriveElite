export default function VehicleCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="bg-gray-200 h-40 rounded-md" />
      <div className="bg-gray-200 h-4 w-3/4 rounded" />
      <div className="bg-gray-200 h-4 w-1/2 rounded" />
      <div className="bg-gray-200 h-8 rounded-md" />
    </div>
  );
}
