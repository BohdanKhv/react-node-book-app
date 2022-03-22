import { useEffect, useState } from "react"
import { CardRow, BookDisplay, BooksRow, Genres, Header } from "../components"
import { getBooks } from "../actions/books" 

const Main = () => {

    const [ items, setItems ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoading(true)
        getBooks('science-fiction', 'most_read').then((res) => { setItems(res.slice(1)); setIsLoading(false) })
    }, [])

    return (
        <>
            <Header />
            <CardRow title={'Best Book Of The Year'} items={ ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011']} />
            <BookDisplay />
            <BooksRow items={items} title="Most Read Books In Science Fiction This Week" isLoading={isLoading} />
            <Genres />
        </>
    )
}

export default Main