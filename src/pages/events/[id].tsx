import { trpc } from "@/shared/api";
import { EventDetail } from "@/entities/event/ui/detail";
import { useRouter } from "next/router";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = trpc.event.findUnique.useQuery(
    { id: Number(id) },
    { enabled: !!id }
  );

  if (!data) return <div>Загрузка...</div>;

  return <EventDetail id={Number(id)} {...data} />;
}