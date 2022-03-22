import './styles/searchForm.css'

const SearchForm = ({ query, setQuery, search }) => {

    return (
        <section className="search-form">
            <input type="text" placeholder="Search" value={query.get('search')} onChange={(e) => setQuery({search: e.currentTarget.value, page: query.get('page')})} />
            <button className="btn btn-primary" onClick={()=> { search(); setQuery({search: query.get('search'), page: 1})} }>Search</button>
        </section>
    )
}

export default SearchForm