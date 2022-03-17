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
        
            $('.bookBox > .coverWrapper > a img').each((index, element) => {
                items.push({
                    cover: $(element).attr('src'),
                    title: $(element).attr('alt'),
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
        const result = await axios('https://www.goodreads.com/genres/list?filter=top-level')
        const $ = cheerio.load(result.data)
        const genreList = []
    
        $('.shelfStat').each((i, el) => {
            genreList.push({
                name: $(el).find('a').text().replace(/\s\s+/g, ''),
                booksCount: $(el).find('.smallText').text().replace(/\s\s+/g, '').replace(' books', '')
            })
        })
        // console.log(genreList)
    
        res.status(200).json(genreList)
    } catch (err) {
        console.log('error', err)
    }

}

module.exports = {
    getBooks,
    getGenres
}