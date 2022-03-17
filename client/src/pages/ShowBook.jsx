
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook } from '../actions/books'
import BookDetails from '../components/content/BookDetails'
import './styles/showBook.css'


const ShowBook = () => {

    const props = useParams()
    const [item, setItem] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
        if(props.id) {
            setIsLoading(true)
            getBook(props.id).then((res) => {setItem(res); setIsLoading(false)})
        }
    }, [])

    return (
        <div className="container">
            <BookDetails item={item} isLoading={isLoading}/>
        </div>
    )
}

export default ShowBook