import { useState } from 'react'
import { RangeSlider } from '../'
import './styles/searchForm.css'

const SearchForm = ({ query, setQuery, search, setAdvancedQuery, advancedQuery }) => {

    const [ displayAdvanced, setDisplayAnvanced ] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const submitSearch = () => {
        setQuery({
            search: searchQuery, 
            page: 1
        });
        search(); 
    }

    return (
        <section>
            <div className="search-form">
                <button 
                    className="btn btn-primary" 
                    onClick={()=> { setDisplayAnvanced(!displayAdvanced) } }
                    title="Advanced Search"
                    style={{
                            borderBottomLeftRadius: displayAdvanced && '0px'
                    }}
                >
                    <img src="https://img.icons8.com/fluency/25/000000/administrative-tools.png"/>
                </button>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    onClick={(e) => {window.scrollTo(0, e.pageY - 50)}}
                    style={{
                            borderTopRightRadius: displayAdvanced && '5px'
                    }}
                    onKeyDown={ (e) => { 
                        if( !displayAdvanced && e.key === "Enter" ) submitSearch()
                    }}
                />
                {!displayAdvanced &&
                    <button 
                        className="btn btn-primary" 
                        onClick={ () => submitSearch() }
                    >
                        Search
                    </button>
                }
            </div>
            {displayAdvanced &&
                <div className="advanced-search">
                    <div className="advanced-search-wrapper">
                        <RangeSlider
                            label="Number Of Pages"
                            min={40}
                            max={2000}
                            step={5}
                            icon={"https://img.icons8.com/color/30/000000/single-page-mode.png"}
                            advancedQuery={advancedQuery}
                            setAdvancedQuery={setAdvancedQuery}
                            query={query}
                            name='NumOfPages'
                        />
                        <hr />
                        <RangeSlider
                            label="Rating"
                            min={1}
                            max={5}
                            step={0.1}
                            icon={"https://img.icons8.com/fluency/30/000000/star.png"}
                            advancedQuery={advancedQuery}
                            setAdvancedQuery={setAdvancedQuery}
                            query={query}
                            name="Rating"
                        />
                        <hr />
                        <RangeSlider
                            label="Rating Count"
                            min={2}
                            max={250000}
                            step={10}
                            icon={"https://img.icons8.com/external-those-icons-lineal-color-those-icons/30/000000/external-rating-feedback-those-icons-lineal-color-those-icons-1.png"}
                            advancedQuery={advancedQuery}
                            setAdvancedQuery={setAdvancedQuery}
                            query={query}
                            name="RatingCount"
                        />
                        <hr />
                        <RangeSlider
                            label="Year Published"
                            min={1950}
                            max={2022}
                            step={1}
                            icon={"https://img.icons8.com/color/30/000000/tear-off-calendar--v1.png"}
                            advancedQuery={advancedQuery}
                            setAdvancedQuery={setAdvancedQuery}
                            query={query}
                            name="PublishDate"
                        />
                        <hr />
                        <button className="btn btn-primary" onClick={ 
                            () => { 
                                setQuery({
                                    search: searchQuery,
                                    ...advancedQuery
                                })
                            } 
                        }>Search</button>
                    </div>
                </div>
            }
        </section>
    )
}

export default SearchForm