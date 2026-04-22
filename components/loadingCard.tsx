import VehicleCardSkeleton from "./VehicleCardSkeleton";
type Props = {
  length: number;
};

export default function LoadingCard({ length }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: length }).map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}
