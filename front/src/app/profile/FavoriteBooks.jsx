"use client";
import React, { useState, useEffect } from 'react';
import BookList from "@/components/BookList";
import { getBookById } from "@/services/book.service";

const FavoriteBooks = () => {
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        const loadFavoriteBooks = async () => {
            const favoriteIds = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
            const favorites = await Promise.all(
                favoriteIds.map(async (id) => {
                    try {
                        const book = await getBookById(id);
                        return book;
                    } catch (error) {
                        // Если книга не найдена, удаляем её из избранного
                        const updatedFavorites = favoriteIds.filter(favId => favId !== id);
                        localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
                        return null;
                    }
                })
            );
            // Фильтруем null значения (удаленные книги)
            setFavoriteBooks(favorites.filter(book => book !== null));
        };

        loadFavoriteBooks();
    }, []);

    if (favoriteBooks?.length === 0) {
        return <p className="text-center text-xl">У вас нет избранных книг</p>;
    }

    return (
        <div className="">
            <BookList
                books={favoriteBooks}
                heading="Избранные книги"
                usePagination={true}
            />
        </div>
    );
};

export default FavoriteBooks;
