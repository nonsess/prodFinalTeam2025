"use client";
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getBookExchanges } from "@/services/exchange.service";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/loading";
import ExchangeItem from "@/components/ExchangeItem";

const HistoryBooks = () => {
    const { token, isAuth } = useAuth();

    const { 
        data: exchanges, 
        isLoading, 
        isError, 
        error 
    } = useQuery({
        queryKey: ['bookExchanges'],
        queryFn: () => getBookExchanges(token),
        enabled: !!token && isAuth,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <p className="text-center text-xl text-red-500">Ошибка загрузки истории: {error.message}</p>;
    }

    if (!exchanges || exchanges.length === 0) {
        return <p className="text-center text-xl">У вас нет истории обменов</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {exchanges.map((exchange, index) => (
                <ExchangeItem key={index} exchange={exchange} />
            ))}
        </div>
    );
};

export default HistoryBooks;