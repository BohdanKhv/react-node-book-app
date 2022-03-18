import { useState } from 'react'
import { SearchForm, SearchCard } from "../components"

const Search = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [foundBooks, setFoundBooks] = useState(null)

    return (
        <div className="container">
            <SearchForm setFoundBooks={setFoundBooks} setIsLoading={setIsLoading} />
            <SearchCard foundBooks={foundBooks} isLoading={isLoading} />
        </div>
    )
}

export default Search