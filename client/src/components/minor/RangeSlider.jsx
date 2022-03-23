import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

const RangeSlider = ({ label, step, min, max }) => {

    const [ value, setValue ] = useState(
        [
            Math.round(min + ((max - min) * 0.25)), 
            Math.round(max - ((max - min) * 0.25))
        ])

    return (
        <div className="range-slider">
            <div className="label">
                <h5>{label}</h5>
                <div className="values">
                    <p>{min === 1 ? value[0].toFixed(1) : value[0]}</p>
                    <p>{min === 1 ? value[1].toFixed(1) : value[1]}</p>
                </div>
            </div>
            <Slider 
                range 
                allowCross={false}
                step={step}
                // defaultValue={[Math.round(min + (max/100) * 10), Math.round(max - (max/100) * 10)]} 
                min={min}
                max={max}
                value={value} 
                onChange={ (value) => setValue(value) }
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
        </div>
    )
}

export default RangeSlider