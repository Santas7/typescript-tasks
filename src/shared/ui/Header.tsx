
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Result School
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Иван Иваныч</span>
            <Link
              href="/events/create"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Создать событие
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}