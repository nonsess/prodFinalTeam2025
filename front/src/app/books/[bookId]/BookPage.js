import React, {useState} from "react";
import Image from "next/image";
import {MapPin} from "lucide-react";
import {Button} from "@/components/ui/button";
import ReviewList from "@/components/ReviewList";
import BookReview from "@/components/BookReview";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import {BASE_URL} from "@/services/constants";
import {getUserById} from "@/services/auth.service";
import Loading from "@/app/loading";
import {redirect} from "next/navigation";
import {checkIsFavorite, toggleFavorite} from "@/services/book.service";
import { useAuth } from "@/context/AuthContext";
import { addBookExchanges } from "@/services/exchange.service";

export default function BookPage({book}) {
    const altText = book?.name || "Book Cover";
    const [isFavorite, setIsFavorite] = useState(() => checkIsFavorite(book.id));
    const {token, isAuth, user} = useAuth();
    const [isExchanging, setIsExchanging] = useState(false);
    const [imgSrc, setImgSrc] = useState(book.photo);
    const isOwner = user?.id === book.creator_id;

    const handleFavoriteClick = async () => {
        const result = await toggleFavorite(book.id);
        setIsFavorite(result);
        toast.success(result ? "Добавлено в избранное" : "Удалено из избранного");
    };

    const {isLoading, data: creator} = useQuery({
        queryKey: ['creator'],
        queryFn: () => getUserById(book.creator_id),
    });

    if (isLoading) return <Loading/>

    const handleBookRequest = async () => {
        setIsExchanging(true);
        try {
            await addBookExchanges(book.id, book.creator_id, token);
            toast.success("Запрос на обмен отправлен!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsExchanging(false);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center mt-8 gap-x-12">
                <div>
                    <div className="relative w-full md:w-[400px] h-[500px] md:h-[700px]">
                        <Image
                            src={imgSrc}
                            fill
                            className="object-cover"
                            alt={altText}
                            onError={() => setImgSrc("/images/fallback-image.png")}
                        />
                    </div>
                    <Button
                        onClick={handleFavoriteClick}
                        className={`w-full mt-5 ${
                            isFavorite
                                ? 'bg-amber-400 text-white hover:bg-amber-500'
                                : 'text-amber-400 bg-transparent border-2 border-amber-400 hover:bg-amber-400 hover:text-white'
                        }`}
                    >
                        {isFavorite ? 'В избранном' : 'В избранное'}
                    </Button>
                </div>

                <div className="flex flex-col gap-8 mt-6 md:mt-0">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl font-semibold">{book?.name}</h2>
                        <p className="text-lg max-w-2xl text-foreground">{book?.description}</p>
                    </div>
                    <ul className="space-y-3 text-lg">
                        <li>Автор: {book?.author}</li>
                        <li><span className="text-foreground">Жанр: {book?.genre}</span></li>
                        <li><span className="text-foreground">Язык: {book?.language}</span></li>
                        <li><span className="text-foreground">Год выпуска: {book?.year}</span></li>
                        <li><span className="text-foreground">Издатель: {book?.publisher}</span></li>
                        <li><span className="text-foreground">Переплёт: {book?.binding}</span></li>
                        <li><span className="text-foreground">Количество страниц: {book?.pages_count}</span></li>
                        <li><span className="text-foreground">Состояние: {book?.condition}</span></li>
                    </ul>
                    <p><MapPin className="inline translate-y-[-3px]"/> {book?.point.city}, {book?.point.place}</p>
                    <Dialog>
                        <DialogTrigger asChild>
                            {isAuth ? (
                                isOwner ? (
                                    <Button disabled className="bg-gray-400 cursor-not-allowed">
                                        Это ваша книга
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick={handleBookRequest}
                                        disabled={isExchanging}
                                    >
                                        {isExchanging ? 'Отправка...' : 'Хочу забронировать'}
                                    </Button>
                                )
                            ) : (
                                <Button
                                    onClick={() => redirect('/login')}
                                >
                                    Войдите, чтобы забронировать
                                </Button>
                            )}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Свяжитесь с владельцем</DialogTitle>
                            <div>{
                                <div>
                                    <p>Имя: {creator.name}</p>
                                    <p>Телефон: {creator.number}</p>
                                    <p>Telegram: {creator.contact}</p>
                                </div>
                            }</div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
}