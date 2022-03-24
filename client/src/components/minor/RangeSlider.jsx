import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';

const RangeSlider = ({ label, step, min, max, icon, name, advancedQuery, setAdvancedQuery, query }) => {

    const [display, setDisplay] = useState(false)

    useEffect(() => {
        if(query.get('min'+name) || query.get('max'+name)) {
            setDisplay(true)
            setAdvancedQuery(prevState => {
                return {
                    ...prevState,
                    ['min'+name]: +query.get('min'+name) || Math.round(min + ((max - min) * 0.25)),
                    ['max'+name]: +query.get('max'+name) || Math.round(max - ((max - min) * 0.25))
                }
                })
        }
    }, [query])

    useEffect(() => {

        if(display) {
            setAdvancedQuery(prevState => {
                return {
                    ...prevState,
                    ['min'+name]: +query.get('min'+name) || Math.round(min + ((max - min) * 0.25)),
                    ['max'+name]: +query.get('max'+name) || Math.round(max - ((max - min) * 0.25))
                }
            })
        }

        if(!display) {
            setAdvancedQuery(prevState => {
                const state = { ...prevState };
                delete state['min'+name]
                delete state['max'+name]
                return state;
            })
        }

    }, [display])

    return (
        <div className="range-slider">
            <div>
                <div className="label">
                    <div className="name">
                        <img src={icon}/>
                        <h5>{label}</h5>
                    </div>
                    <div className="display-toggle">
                        {display ? 
                            <button className="btn btn-danger" onClick={() => setDisplay(false)}>
                                <img src="https://img.icons8.com/cotton/35/000000/minus--v1.png"/>
                            </button>
                        :
                            <button className="btn btn-primary" onClick={() => setDisplay(true)}>
                                <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/35/000000/external-plus-100-most-used-icons-flaticons-lineal-color-flat-icons.png"/>
                            </button>
                        }
                    </div>
                </div>
                {display && advancedQuery['min'+name] &&
                    <div className="values">
                        <p>{min === 1 ? advancedQuery['min'+name].toFixed(1) : advancedQuery['min'+name].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p>{min === 1 ? advancedQuery['max'+name].toFixed(1) : advancedQuery['max'+name].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    </div>
                }
            </div>
            {display && advancedQuery['min'+name] &&
                <Slider 
                    range 
                    allowCross={false}
                    step={step}
                    // defaultValue={[Math.round(min + (max/100) * 10), Math.round(max - (max/100) * 10)]} 
                    min={min}
                    max={max}
                    value={[advancedQuery['min'+name], advancedQuery['max'+name]]} 
                    onChange={ (value) => {
                        setAdvancedQuery({
                            ...advancedQuery,
                            ['min'+name]: value[0],
                            ['max'+name]: value[1],
                        })
                    }}
                    pushable={ Math.round(((max+1 - min)/100 * 10)) }
                    trackStyle={{ 
                        height: 10, 
                        background: 'var(--primary)' 
                    }}
                    railStyle={{ 
                        height: 10,
                        backgroundColor: 'var(--extra-light)'
                    }}
                    handleStyle={{
                        height: 28,
                        width: 28,
                        marginTop: -9,
                        backgroundColor: 'var(--extra-light)',
                        borderColor: 'var(--primary)' 
                    }}
                />
            }
        </div>
    )
}

export default RangeSlider