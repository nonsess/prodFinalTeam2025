import React from 'react';
import Link from "next/link";
import BookItem from "@/components/BookItem";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

const BookList = ({heading, books, usePagination = false}) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBooks = books.slice(startIndex, endIndex);

    return (
        <div className="px-4">
            <h2 className={'text-2xl font-bold mb-4'}>{heading}</h2>
            <ul className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'}>
                {currentBooks.map(book => (
                    <Link href={`books/${book.id.toString()}`} className={'flex'} key={book.id}>
                        <BookItem book={book}/>
                    </Link>
                ))}
            </ul>
            {usePagination && currentBooks.length > 0 && <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className={'cursor-pointer'}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>
                    {Array.from({length: totalPages}).map((_, index) => (
                        <PaginationItem key={index + 1}>
                            <PaginationLink
                                onClick={() => setCurrentPage(index + 1)}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            className={'cursor-pointer'}

                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            }
        </div>
    );
};

export default BookList;