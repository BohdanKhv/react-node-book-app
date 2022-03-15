import { useState } from 'react'
import { SearchForm } from "../components"
import DisplayRow from "../components/content/DisplayRow"

const Search = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [foundBooks, setFoundBooks] = useState(null)

    return (
        <div className="container">
            <SearchForm setFoundBooks={setFoundBooks} setIsLoading={setIsLoading} />
            <DisplayRow foundBooks={foundBooks} isLoading={isLoading} />
        </div>
    )
}

export default Search