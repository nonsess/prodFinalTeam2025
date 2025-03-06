import {BASE_URL} from "@/services/constants";

const BOOK_URL = BASE_URL + "/api/v1/book-offer"

export async function getBooks (){
    const res = await fetch(`${BOOK_URL}/?size=35`)
    const books = await res.json()

    return books.map(book => ({
        ...book,
        photo: book.main_photo.url ? `${BASE_URL}${book.main_photo.url}` : "/images/fallback-image.png"
    })) || []
}

export async function getMyBooks(token, page = 1, size = 10) {
    const res = await fetch(`${BOOK_URL}/me?page=${page}&size=${size}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const books = await res.json();

    return books.map(book => ({
        ...book,
        photo: book.main_photo.url ? `${BASE_URL}${book.main_photo.url}` : "/images/fallback-image.png"
    })) || [];
}

export async function getBookById (id){
    const res = await fetch(`${BOOK_URL}/${id}`)
    const book = await res.json()

    book.photo = book.main_photo.url ? `${BASE_URL}${book.main_photo.url}` : "/images/fallback-image.png"
    
    return book || {}
}

export async function addBook(obj) {
    await fetch(`${BOOK_URL}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${obj.token}`,
        },
        body: obj.formData,
    })
}

export const toggleFavorite = async (bookId) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
    const isBookFavorite = favorites.includes(bookId);

    if (isBookFavorite) {
        const updatedFavorites = favorites.filter(id => id !== bookId);
        localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
        return false;
    } else {
        localStorage.setItem('favoriteBooks', JSON.stringify([...favorites, bookId]));
        return true;
    }
};

export const checkIsFavorite = (bookId) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
    return favorites.includes(bookId);
};
