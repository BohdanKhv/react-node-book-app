import { Book } from '../components'
import { getBestOfTheYear } from '../actions/books'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BestBookView = () => {

    const params = useParams()
    const [items, setItems] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getBestOfTheYear(params.id).then((res) => {setItems(res); setIsLoading(false)})
    }, [params])

    return (
        <section className="best-book-view">
            <div className="container">
                <Book 
                    title={`Best Books of ${params.id}`} 
                    items={items}
                    isLoading={isLoading} 
                />
            </div>
        </section>
    )
}

export default BestBookView