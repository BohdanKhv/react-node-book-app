import { useEffect, useState } from "react"
import { CardRow, BookDisplay, BooksRow, Genres, Header } from "../components"
import { getBooks } from "../actions/books" 

const Main = () => {

    const favoritGenres = ['fiction', '40k', 'space', 'novella', 'futurism', 'futuristic', 'artificial-intelligence']

    const [ item, setItem ] = useState(null)
    const [ items, setItems ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ randomGenre, setRandomGenre ] = useState(favoritGenres[Math.floor(Math.random()*favoritGenres.length)])

    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoading(true)
        getBooks(randomGenre, 'most_read')
        .then((res) => { 
            setItems(res.slice(1)); 
            setItem(res[0]);
            setIsLoading(false);
        })
    }, [])

    return (
        <>
            <Header />
            <CardRow title={'Best Book Of The Year'} items={ ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011']} />
            <BookDisplay item={item} isLoading={isLoading} randomGenre={randomGenre} />
            <BooksRow 
                items={items} 
                title={`Most Read Books In ${randomGenre.replaceAll('-', ' ')} This Week`} i
                sLoading={isLoading} />
            <Genres />
        </>
    )
}

export default Main