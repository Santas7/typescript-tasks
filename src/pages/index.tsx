import { EventCard } from "@/entities/event";
import { JoinEventButton, UnjoinEventButton } from "@/features/join-event";
import { trpc } from "@/shared/api";

export default function Home() {
  const { data, refetch } = trpc.event.findMany.useQuery();

  return (
    <ul>
      {data?.map((event) => (
        <li key={event.id} className="mb-6">
          <EventCard
            {...event}
            action={
              event.isJoined ? (
                <UnjoinEventButton eventId={event.id} onSuccess={refetch} />
              ) : (
                <JoinEventButton eventId={event.id} onSuccess={refetch} />
              )
            }
          />
        </li>
      ))}
    </ul>
  );
}