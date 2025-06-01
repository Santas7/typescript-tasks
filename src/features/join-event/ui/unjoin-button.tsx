import { trpc } from "@/shared/api";

type UnjoinEventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
};

export const UnjoinEventButton = ({
  eventId,
  onSuccess,
}: UnjoinEventButtonProps) => {
  const { mutate } = trpc.event.unjoin.useMutation({ onSuccess });

  const handleClick = () => {
    mutate({ id: eventId });
  };

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-red-500 text-white hover:bg-red-600"
      onClick={handleClick}
    >
      Отписаться
    </button>
  );
};