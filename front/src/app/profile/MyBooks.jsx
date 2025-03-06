"use client";
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import BookList from "@/components/BookList";
import { getMyBooks } from "@/services/book.service";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/loading";

const MyBooks = () => {
    const { token } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const { isLoading, data: books, error } = useQuery({
        queryKey: ['myBooks', currentPage],
        queryFn: () => getMyBooks(token, currentPage, ITEMS_PER_PAGE),
        enabled: !!token
    });

    if (isLoading) return <Loading />;
    if (books?.length === 0) {
        return <p className="text-center text-xl">У вас нет загруженных книг</p>;
    }
    return (
        <div className="">
            <BookList 
                books={books} 
                heading="Мои книги"
                usePagination={true}
                currentPage={currentPage}
                totalPages={Math.ceil(books.length / ITEMS_PER_PAGE)}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default MyBooks;
