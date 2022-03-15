import axios from 'axios'

// Search for books by title
const searchBooks = async (q) => {
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`)
    return result.data
}

export {
    searchBooks
}