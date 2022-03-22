const axios = require('axios')
const cheerio = require('cheerio')

const getBooks = async (req, res) => {
    if(!req.query.genre || !req.query.type) {
        res.status(400).json({error: 'Genre and type are required'})
    } else {

        try{
            // Type {'most_read', 'new_releases'} Genre {'any'}
            const result = await axios.get(`https://www.goodreads.com/genres/${req.query.type}/${req.query.genre}`)
            const $ = cheerio.load(result.data)
            const items = []
        
            $('.bookBox > .coverWrapper > a').each((index, element) => {
                items.push({
                    id: $(element).attr('href').replace('/book/show/', ''),
                    cover: $(element).find('img').attr('src'),
                    title: $(element).find('img').attr('alt'),
                })
            })
    
            res.status(200).json(items)
        } catch (err) {
            console.log('error', err)
        }

    }
}

const getGenres = async (req, res) => {
    try {
        const result = await axios.get('https://www.goodreads.com/genres/list?filter=top-level')
        const $ = cheerio.load(result.data)
        const genreList = []
    
        // Scrape all genres
        $('.shelfStat').each((i, el) => {
            genreList.push({
                name: $(el).find('a').text().replace(/\s\s+/g, ''),
                booksCount: $(el).find('.smallText').text().replace(/\s\s+/g, '').replace(' books', '')
            })
        })

        res.status(200).json(genreList)
    } catch (err) {
        console.log('error', err)
    }
}

const getBook = async (req, res) => {
    if(!req.params.id) {
        res.status(400).json({error: 'Book id is required'})
    }

    try {
        // Scrape one book info
        const result = await axios.get(`https://www.goodreads.com/book/show/${req.params.id}`)
        const $ = cheerio.load(result.data)
        const item = {
            title: $('#bookTitle').text().replace(/\s\s+/g, '').replaceAll('\n', ''),
            author: $('#bookAuthors .authorName span[itemprop="name"]').text(),
            bookMeta: {
                rating: $('#bookMeta span[itemprop="ratingValue"]').text().replace(/\s\s+/g, '').replaceAll('\n', ''),
                ratingCount: $('#bookMeta meta[itemprop="ratingCount"]').attr('content')
            },
            cover: $('#coverImage').attr('src'),
            details: {
                bookFormat: $('#details span[itemprop="bookFormat"]').text(),
                numberOfPages: $('#details span[itemprop="numberOfPages"]').text().replace(' pages', ''),
                publishDate: $('#details > div.row').text().replace(/\s\s+/g, ' ').replaceAll('\n', ' ').split('pages').pop(),
                language: $('#bookDataBox div[itemprop="inLanguage"]').text()
            },
            amazonLink: `https://www.amazon.com/s?k=${$('#bookTitle').text().replace(/\s\s+/g, '').replaceAll('\n', '').replaceAll(' ', '+')}&i=stripbooks`,
            description: $('#description span:nth-of-type(2)').html(),
            related: []
        }

        // Get book page count from google books api only if nothing was scraped
        if(item.details.numberOfPages === '') {
            const gSearch = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.id}&printType=books&maxResults=1`)
            if (gSearch?.data?.items[0]?.volumeInfo.pageCount) {
                item.details.bookFormat = "Book"
                item.details.numberOfPages = gSearch?.data?.items[0]?.volumeInfo?.pageCount
                item.details.publishDate = gSearch?.data?.items[0]?.volumeInfo?.publishedDate?.replaceAll('-', '/')
            }
        }

        // Add ralated books to that item
        $('.bookCarousel a').each((i, el) => {
            item['related'].push({
                id: $(el).attr('href').split('show/').pop(),
                cover: $(el).find('img').attr('src'),
                title: $(el).find('img').attr('alt')
            })
        })
        res.status(200).json(item)
    } catch (err) {
        console.log('error', err)
    }
}

const search = async (req, res) => {
    if(!req.query.q) {
        res.status(400).json({error: 'Search query is required. (q=query)'})
    }

    try {
        const result = await axios.get(`https://www.goodreads.com/search?query=${req.query.q}&page=${req.query.page ? req.query.page : 1}`)
        const $ = cheerio.default.load(result.data)
        // document.querySelector('.previous_page ').parent().children[document.querySelector('.previous_page ').parent().children.length-2]
        
        const data = {
            items: [],
            pages: $( $('.previous_page').parent().children()[ $('.previous_page').parent().children().length - 2 ] ).text()
        }

        $('.tableList tr').each((i, el) => {
            data.items.push({
                id: $(el).find('.bookTitle').attr('href').match(/(?<=show\/)(.*)(?=\?)/gi)[0],
                cover: $(el).find('img').attr('src').slice(0, -10) + '_SX475_' + $(el).find('img').attr('src').slice(-4),
                title: $(el).find('span[itemprop="name"]').text(),
                author: $(el).find('span[itemprop="author"]').text().replaceAll('\n', ''),
                bookMeta: {
                    rating: $(el).find('.minirating').text().replace(' ', '').match(/(.*)(?= avg)/gi)[0].replace(/[^\d.]/g, ''),
                    ratingCount: $(el).find('.minirating').text().split('— ').pop().split(' ratings')[0].replace(/[^\d.]/g, '')
                },
                details: {
                    publishDate: $(el).find('.minirating').parent().text().includes('published') ? 
                                    $(el).find('.minirating').parent().text().replace(/\n\s\s+/g, '').split('published').pop().slice(0,4)
                                : '',
                }
            })
        })
        res.status(200).json(data)
    } catch (err) {
        console.log('error', err)
    }
}

const getBookOfTheYear = async (req, res) => {

    if(!req.params.year) {
        res.status(400).json({error: 'Year is required'})
    }

    try {
        const result = await axios.get(`https://www.goodreads.com/choiceawards/best-books-${req.params.year}`)
        const $ = cheerio.load(result.data)
        const items = []

        $('.category').each((i, el) => {
            items.push({
                id: $(el).find('.stars').attr('data-resource-id') + '-' +$(el).find('img').attr('alt').replace(/[^a-z0-9 -]/gi, '').replaceAll(' ', '-'),
                cover: $(el).find('img').attr('src'),
                title: $(el).find('img').attr('alt'),
                category: $(el).find('.category__copy').text().replace(/\n\s\s+/g, '').replaceAll('\n', '')
            })
        })

        res.status(200).json(items)

    } catch (err) {
        console.log('error', err)
    }
} 

module.exports = {
    getBooks,
    getGenres,
    getBook,
    search,
    getBookOfTheYear
}