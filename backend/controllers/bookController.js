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
            console.log('Error to get most_read or new_releases books')
            res.status(400).json({items: [], error: 'Somthing went wrong'})
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
        console.log('Error to genres')
        res.status(400).json({genreList: [], error: 'Somthing went wrong'})
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
                id: $(el).find('.stars').attr('data-resource-id'),
                cover: $(el).find('img').attr('src'),
                title: $(el).find('img').attr('alt'),
                category: $(el).find('.category__copy').text().replace(/\n\s\s+/g, '').replaceAll('\n', '')
            })
        })

        res.status(200).json(items)

    } catch (err) {
        console.log('Error to get book of the year')
        res.status(400).json({items: [], error: 'Somthing went wrong'})
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
            id: req.params.id,
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
            related: [],
            genres: []
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

        // Add related genres
        $('.bigBoxBody .elementList').each((i, el) => {
            $(el).find('.actionLinkLite').each((i, elem) => {
                item['genres'].push({
                    name: $(elem).attr('href').split('genres/').pop()
                })
            })
        }) 
        res.status(200).json(item)
    } catch (err) {
        console.log('Error getting the book')
        res.status(400).json({item: null, error: 'Book was not found'})
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
                id: $(el).find('.ratingStars .stars').attr('data-resource-id'),
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
        console.log('Error while searching')
        res.status(400).json({items: [], error: 'Nothing was found'})
    }
}

const requestSearch = async (
        query,
        page,
        minRating, 
        maxRating, 
        minRatingCount,
        maxRatingCount,
        minPublishDate,
        maxPublishDate,
        minNumOfPages,
        maxNumOfPages,
    ) => {
    let pageCount = 1

    const items = []

    while(pageCount <= page && items.length < 10) {

        try {

            const result = await axios.get(`https://www.goodreads.com/search?query=${query}&page=${pageCount}`)
            const $ = cheerio.default.load(result.data)

            $('.tableList tr').each( async (i, el) => {
                const star = +$(el).find('.minirating').text().replace(' ', '').match(/(.*)(?= avg)/gi)[0].replace(/[^\d.]/g, '') || 0
                const ratingCount = +$(el).find('.minirating').text().split('— ').pop().split(' ratings')[0].replace(/[^\d.]/g, '') || 0
                const publishDate = $(el).find('.minirating').parent().text().includes('published') ? 
                                        +$(el).find('.minirating').parent().text().replace(/\n\s\s+/g, '').split('published').pop().slice(0,4)
                                    : 0
                let numberOfPages = 0

                // Get number of pages from googles api
                if(minNumOfPages || maxNumOfPages) {
                    numberOfPages = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${$(el).find('span[itemprop="name"]').text()}&printType=books&maxResults=1`)
                    .then(
                        (res) => {
                            return res.data?.items[0]?.volumeInfo.pageCount ? res.data?.items[0]?.volumeInfo?.pageCount : 0
                        }
                    )
                    .catch(e => { return 0 })
                }

                if (
                    star >= minRating && 
                    star <= maxRating &&
                    ratingCount >= minRatingCount &&
                    ratingCount <= maxRatingCount &&
                    publishDate >= minPublishDate &&
                    publishDate <= maxPublishDate &&
                    numberOfPages >= (minNumOfPages || 0) &&
                    numberOfPages <= (maxNumOfPages || 5000)
                ){

                    items.push({
                        id: $(el).find('.ratingStars .stars').attr('data-resource-id'),
                        cover: $(el).find('img').attr('src').slice(0, -10) + '_SX475_' + $(el).find('img').attr('src').slice(-4),
                        title: $(el).find('span[itemprop="name"]').text(),
                        author: $(el).find('span[itemprop="author"]').text().replaceAll('\n', ''),
                        bookMeta: {
                            rating: $(el).find('.minirating').text().replace(' ', '').match(/(.*)(?= avg)/gi)[0].replace(/[^\d.]/g, ''),
                            ratingCount: $(el).find('.minirating').text().split('— ').pop().split(' ratings')[0].replace(/[^\d.]/g, '')
                        },
                        details: {
                            numberOfPages: numberOfPages,
                            publishDate: $(el).find('.minirating').parent().text().includes('published') ? 
                                            $(el).find('.minirating').parent().text().replace(/\n\s\s+/g, '').split('published').pop().slice(0,4)
                                        : '',
                        }
                    })

                }
            })

            console.log(items.length, 'item length')
            pageCount++
        
        } catch(err) {
            console.log("Error while looping the pages")
            return items
        }

    }

    return items
}

const advancedSearch = async (req, res) => {
    
    if(!req.query.search) {
        res.status(400).json({error: 'Search query is required. (q=query)'})
    }

    const minRating = req.query.minRating || 0
    const maxRating = req.query.maxRating || 5
    const minRatingCount = req.query.minRatingCount || 0
    const maxRatingCount = req.query.maxRatingCount || 9999999
    const minPublishDate = req.query.minPublishDate || 1990
    const maxPublishDate = req.query.maxPublishDate || 2023
    const minNumOfPages = req.query.minNumOfPages || null
    const maxNumOfPages = req.query.maxNumOfPages || null
    const q = req.query.search || '40k'

    const result = await axios.get(`https://www.goodreads.com/search?query=${q}`)
    const $ = cheerio.default.load(result.data)
    const maxPages = $( $('.previous_page').parent().children()[ $('.previous_page').parent().children().length - 2 ] ).text()

    const data = await requestSearch(
            q,
            maxPages,
            minRating, 
            maxRating, 
            minRatingCount,
            maxRatingCount,
            minPublishDate,
            maxPublishDate,
            minNumOfPages,
            maxNumOfPages,
        )

        // console.log(data)

    res.status(200).json({items: data})

}

module.exports = {
    getBooks,
    getGenres,
    getBook,
    search,
    advancedSearch,
    getBookOfTheYear
}