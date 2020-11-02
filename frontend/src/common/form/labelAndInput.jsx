import React from 'react'
import Grid from '../layout/grid'

export default props=>(
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label htmlFor={props.name}>
                {props.label}
            </label>
            {/**{...props.input} significa que o input esta recebendo varios parametros de outro component */}
            <input {...props.input} className='form-control'  placeholder={props.placeholder}
                readOnly={props.readOnly} type={props.type}/>
        </div>
    </Grid>
)