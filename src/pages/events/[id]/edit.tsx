import { useRouter } from "next/router";
import { trpc } from "@/shared/api";
import { useState } from "react";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = trpc.event.findUnique.useQuery(
    { id: Number(id) },
    { enabled: !!id }
  );
  const { mutate } = trpc.event.update.useMutation({
    onSuccess: () => router.push(`/events/${id}`),
  });

  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [date, setDate] = useState(data?.date ? data.date.toISOString().split("T")[0] : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      id: Number(id),
      title,
      description: description || undefined,
      date: new Date(date),
    });
  };

  if (!data) return <div>Загрузка...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Редактировать событие</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Название
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Описание
          </label>
          <textarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Дата
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={() => router.push(`/events/${id}`)}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}