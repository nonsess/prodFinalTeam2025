import { BASE_URL } from "@/services/constants";

export async function addBookExchanges(bookId, user_from_id, token) {    
    const response = await fetch(`${BASE_URL}/api/v1/book-exchanges`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            book_id: bookId,
            user_from_id: user_from_id
        })
    });

    if (!response.ok) {
        throw new Error('Ошибка при отправке запроса на обмен');
    }

    return response.json();
}

export async function getBookExchanges(token) {
    const response = await fetch(`${BASE_URL}/api/v1/book-exchanges`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Ошибка при получении списка запросов на обмен');
    }

    return response.json();
}