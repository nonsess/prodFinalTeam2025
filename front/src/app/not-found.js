import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-4xl font-bold mb-4">404 - Страница не найдена</h2>
            <p className="text-xl mb-8">Страница, которую вы ищете, не существует</p>
            <Link
                href="/"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg  hover:scale-105 transition-transform"
            >
                Вернуться на главную
            </Link>
        </div>
    )
}
