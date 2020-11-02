import React from 'react'


export default props=>{
    if(props.readOnly){
        return(
            <select {...props.input} className='form-control' 
                readOnly={props.readOnly} disabled='disabled'>
                <option value='PAGO'>Pago</option>
                <option value='PENDENTE'>Pendente</option>
                <option value='AGENDADO'>Agendado</option>
            </select>
        )
    }else{
        return(
            <select {...props.input} className='form-control' 
                readOnly={props.readOnly} >
                <option value='PAGO'>Pago</option>
                <option value='PENDENTE'>Pendente</option>
                <option value='AGENDADO'>Agendado</option>
            </select>
        )
    }
     
}