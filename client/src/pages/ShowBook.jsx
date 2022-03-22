
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook } from '../actions/books'
import { BookDetails, BooksRow, CardRow } from '../components'
import './styles/showBook.css'


const ShowBook = () => {

    const params = useParams()
    const [item, setItem] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
        if(params.id) {
            setIsLoading(true)
            getBook(params.id).then((res) => {setItem(res); setIsLoading(false)})
        }
    }, [params])

    return (
        <>
            <BookDetails item={item} isLoading={isLoading}/>
                <BooksRow items={item?.related} title="Related Books" isLoading={isLoading} />
            {item && 
                <CardRow title="Related Genres" items={item.genres} />
            }
        </>
    )
}

export default ShowBook