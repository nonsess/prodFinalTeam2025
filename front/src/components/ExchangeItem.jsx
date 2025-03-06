"use client"
import Image from "next/image"
import { BASE_URL } from "@/services/constants";
import {MapPin, User, Users} from "lucide-react";
import React from "react";

export default function ExchangeItem({ exchange }) {
    const { book_offer, user_from, user_to } = exchange;

    return (
        <div className='p-4 rounded-md transition-transform transform hover:scale-105 h-full flex flex-col'>
            <div className="relative w-full h-[300px]">
                <Image
                    src={`${BASE_URL}${book_offer.main_photo.url}`}
                    fill
                    className="object-cover rounded-lg"
                    alt={book_offer.name}
                    onError={(e) => {
                        e.target.src = "/images/fallback-image.png";
                    }}
                />
            </div>

            <div className="flex flex-col flex-grow gap-2 mt-4">
                <h3 className="text-lg font-semibold">{book_offer.name}</h3>
                <p className="text-md">{book_offer.author}</p>

                <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="text-sm">
                            От: <span className="font-medium">{user_from.name}</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                            Кому: <span className="font-medium">{user_to.name}</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                            {book_offer.point.city}, {book_offer.point.place}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}