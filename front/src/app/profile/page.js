"use client"
import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/services/auth.service";
import {redirect} from "next/navigation";
import Loading from "@/app/loading";
import { useAuth } from '@/context/AuthContext';
import FavoriteBooks from "@/app/profile/FavoriteBooks";
import MyBooks from './MyBooks';
import HistoryBooks from './HistoryBooks';

const Profile = () => {
    const { token, isLoading: isAuthLoading } = useAuth();

    const { isLoading, data: user, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token),
        enabled: !!token,
        onError: () => {
            redirect('/login');
        }
    });

    if (isAuthLoading || isLoading) return <Loading />;
    if (error || !user?.email) redirect('/login');
    return (
        <div className="flex flex-col min-h-[calc(100vh-68px)] py-4 md:py-8 px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6 md:mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center md:text-left">
                        Здравствуйте, {user?.name}!
                    </h1>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-primary">{user?.email}</p>
                    <p className="text-primary">{user?.number}</p>
                    <p className="text-primary"><a href={`https://t.me/${user.contact}`}>@{user?.contact}</a></p>
                </div>
            </div>

            <Tabs defaultValue="my_books" className="w-full flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-6 bg-transparent shadow-md gap-1 sm:gap-2">
                    <TabsTrigger
                        value="my_books"
                        className="text-xs sm:text-sm md:text-base data-[state=active]:text-primary border-transparent border-2 data-[state=active]:border-primary px-1 sm:px-2 md:px-4"
                    >
                        Мои книги
                    </TabsTrigger>
                    <TabsTrigger
                        value="my"
                        className="text-xs sm:text-sm md:text-base data-[state=active]:text-primary border-transparent border-2 data-[state=active]:border-primary px-1 sm:px-2 md:px-4"
                    >
                        Избранные
                    </TabsTrigger>
                    <TabsTrigger
                        value="saved"
                        className="text-xs sm:text-sm md:text-base data-[state=active]:text-primary border-transparent border-2 data-[state=active]:border-primary px-1 sm:px-2 md:px-4"
                    >
                        История
                    </TabsTrigger>
                </TabsList>
                <div className="flex-1 overflow-y-auto">
                    <TabsContent value="my_books" className="h-full">
                        <MyBooks /> 
                    </TabsContent>
                    <TabsContent value="my" className="h-full">
                        <FavoriteBooks />
                    </TabsContent>
                    <TabsContent value="saved" className="h-full">
                        <HistoryBooks />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Profile;