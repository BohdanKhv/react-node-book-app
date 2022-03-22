import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SearchForm, Book } from "../components"
import { searchBooks } from '../actions/books'
import Pagination from 'rc-pagination'
import './styles/pagination.css'

const Search = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState(null)
    const [pages, setPages] = useState(null)
    const [query, setQuery] = useSearchParams({search: '', page: 1})

    const search = () => {
        const search = query.get('search')
        const page = query.get('page')
        if(search && search !== '') {
            setIsLoading(true)
            window.scrollTo(0, 200)
            searchBooks(search, page).then( 
                (res) => {
                    setItems(res.items);
                    setPages(+res.pages)
                    setIsLoading(false);
            } )
        }
    }

    const nextPage = (toPage) => {
        setQuery({search: query.get('search'), page: toPage})
    }


    useEffect(() => {
        search()
    }, [query.get('page')])

    return (
        <section className="search">
            <div className="container">
                <SearchForm 
                    search={search} 
                    setQuery={setQuery} 
                    query={query}
                />
                <Book 
                    title="Found" 
                    items={items} 
                    isLoading={isLoading} 
                    isSearch={true}
                />
                {!isLoading && pages && 
                    <Pagination 
                        showLessItems
                        pageSize={20}
                        showSizeChanger={false}
                        showTitle={false}
                        total={pages*20}
                        onChange={(toPage, pageSize) => {nextPage(toPage)}}
                        current={+query.get('page')}
                        prevIcon={
                            <a>{'<'}</a>
                        }
                        jumpNextIcon={
                            <a>{'...'}</a>
                        }
                        jumpPrevIcon={
                            <a>{'...'}</a>
                        }
                        nextIcon={
                            <a>{'>'}</a>
                        }
                    />
                }
            </div>
        </section>
    )
}

export default Search