import axios from 'axios'

const apiUrl = 'api/books/'

// Search for books by title
const searchBooks = async (q) => {
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}$printType=books`)
    // const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&filter=free-ebooks`)
    // console.log(result.data.items)
    return result.data
}

const getGenres = async () => {
    try {
        const result = await axios.get(`${apiUrl}genres/list`)
        return result.data
    } catch (err) {
        console.log(err)
    }
}

const getBooks = async (genre, type) => {
    try {
        const result = await axios.get(`/${apiUrl}newreleases?genre=${genre}&type=${type}`)
        return result.data
    } catch (err) {
        console.log(err)
    }
}

export {
    searchBooks,
    getGenres,
    getBooks
}