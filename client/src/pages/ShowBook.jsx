
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook } from '../actions/books'
import BookDetails from '../components/content/BookDetails'
import CardsRow from '../components/content/CardsRow'
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
        <div className="container">
            <BookDetails item={item} isLoading={isLoading}/>
            {item && 
                <CardsRow items={item?.related} title="Related" />
            }
        </div>
    )
}

export default ShowBook