import axios from 'axios'

const apiUrl = '/api/books/'

// Search for books by title
const searchBooks = async (q, page) => {
    const result = await axios.get(`${apiUrl}search?q=${q}&page=${page}`)
    return result.data
}

// Get all genres
const getGenres = async () => {
    try {
        const result = await axios.get(`${apiUrl}genres/list`)
        return result.data
    } catch (err) {
        console.log(err)
    }
}

// Get top books
const getBooks = async (genre, type) => {
    try {
        const result = await axios.get(`${apiUrl}newreleases?genre=${genre}&type=${type}`)
        return result.data
    } catch (err) {
        console.log(err)
    }
}

// Get one book
const getBook = async (id) => {
    try {
        const result = await axios.get(`${apiUrl}book/${id}`)
        return result.data
    } catch (err) {
        console.log(err)
    }
}

const getBestOfTheYear = async (id) => {
    try {
        const result = await axios.get(`${apiUrl}bestbook/${id}`)
        return result.data
    } catch (err) {
        console.log(err)
    }
}

const getAdvancedSearch = async (data) => {
    try {
        const result = await axios.get(`${apiUrl + 'advancedsearch?' + data}`)
        console.log(result.data)
        return result.data
    } catch (err) {
        console.log(err)
    }
}

export {
    searchBooks,
    getGenres,
    getBooks,
    getBook,
    getBestOfTheYear,
    getAdvancedSearch
}