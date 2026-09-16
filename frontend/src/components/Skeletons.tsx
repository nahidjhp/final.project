export function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-paper-raised">
      <div className="h-36 bg-line/60" />
      <div className="space-y-2.5 p-4">
        <div className="h-4 w-3/4 rounded bg-line/60" />
        <div className="h-3 w-1/2 rounded bg-line/60" />
        <div className="h-8 w-full rounded bg-line/60" />
      </div>
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="flex animate-pulse items-start gap-4 rounded-xl border border-line bg-paper-raised p-4">
      <div className="h-14 w-14 shrink-0 rounded-full bg-line/60" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-line/60" />
        <div className="h-3 w-2/3 rounded bg-line/60" />
      </div>
    </div>
  );
}

export function GridSkeleton({ Item, count = 6 }: { Item: () => React.JSX.Element; count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
}
