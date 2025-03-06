"use client"
import Image from "next/image"
import {MapPin} from "lucide-react";
import React, { useState } from "react";

export default function BookItem({ book }) {
    const [imgSrc, setImgSrc] = useState(book.photo);
    return (
        <div className='p-4 rounded-md transition-transform transform hover:scale-105 h-full flex flex-col '>

            <div className="relative w-[200px] h-[300px]">
                <Image
                    src={imgSrc}
                    fill
                    className="object-cover rounded-lg"
                    alt={book.name}
                    onError={() => setImgSrc("/images/fallback-image.png")}
                />
            </div>
            <div className="flex flex-col flex-grow gap-2">
                <h3 className="mt-2 text-lg font-semibold">{book.name}</h3>
                <p className="text-md">{book.author}</p>
                <p className="text-sm mt-auto"><MapPin
                    className={'inline text-sm translate-y-[-3px]'}/> {book.point.city}. {book.point.place}</p>
            </div>
        </div>
    )
}
