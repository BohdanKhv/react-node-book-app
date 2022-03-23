import { useState } from 'react'
import { RangeSlider } from '../'
import './styles/searchForm.css'

const SearchForm = ({ query, setQuery, search }) => {

    const [ displayAdvanced, setDisplayAnvanced ] = useState(true)

    return (
        <section>
            <div className="search-form">
                <button 
                    className="btn" 
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
                    value={query.get('search')} 
                    onChange={(e) => setQuery({search: e.currentTarget.value, page: query.get('page')})}
                    onClick={(e) => {window.scrollTo(0, e.pageY - 50)}}
                    style={{
                            borderTopRightRadius: displayAdvanced && '5px'
                    }}
                />
                {!displayAdvanced &&
                    <button className="btn btn-primary" onClick={()=> { search(); setQuery({search: query.get('search'), page: 1})} }>Search</button>
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
                        />
                        <hr />
                        <RangeSlider
                            label="Rating"
                            min={1}
                            max={5}
                            step={0.1}
                        />
                        <hr />
                        <RangeSlider
                            label="Rating Count"
                            min={100}
                            max={2000000}
                            step={50}
                        />
                        <hr />
                        <RangeSlider
                            label="Year Published"
                            min={1950}
                            max={2022}
                            step={1}
                        />
                        <hr />
                        <button className="btn btn-primary" onClick={()=> { console.log('search') }}>Search</button>
                    </div>
                </div>
            }
        </section>
    )
}

export default SearchForm