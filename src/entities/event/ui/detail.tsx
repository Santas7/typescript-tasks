import { RouterOutput } from "@/shared/api";
import { useRouter } from "next/router";

type EventDetailProps = NonNullable<RouterOutput["event"]["findUnique"]> & {
  id: number;
};

export const EventDetail = ({
  id,
  title,
  description,
  date,
  participations,
}: EventDetailProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
        >
          Назад
        </button>
        <button
          onClick={() => router.push(`/events/${id}/edit`)}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Редактировать
        </button>
      </div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Информация о событии
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Название
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Описание
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Дата проведения
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {date.toLocaleDateString()}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Участники
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {participations.map(({ user }) => user.name).join(", ")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};