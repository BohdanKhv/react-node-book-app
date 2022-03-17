import { useState } from 'react'
import './styles/searchForm.css'
import { searchBooks } from '../../actions/books'

const SearchForm = ({ setFoundBooks, setIsLoading }) => {

    const [query, setQuery] = useState('')

    const search = () => {
        if(query !== '') {
            setIsLoading(true)
            searchBooks(query).then( 
                (res) => {
                    setFoundBooks(res); 
                    setIsLoading(false); 
            } )
        }
    }

    return (
        <section className="search-form">
            <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
            <button className="btn btn-primary" onClick={search}>Search</button>
        </section>
    )
}

export default SearchForm