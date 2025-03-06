"use client";
import React from "react";
import { getBookById } from "@/services/book.service";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import BookPage from "./BookPage";

const Page = ({ params }) => {
    const { bookId } = React.use(params);

    const { data: book, isLoading } = useQuery({
        queryKey: ['book', bookId],
        queryFn: () => getBookById(bookId),
        retry: false,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (!book || !book.id) {
        return null;
    }

    return <BookPage book={book} />;
};

export default Page;
