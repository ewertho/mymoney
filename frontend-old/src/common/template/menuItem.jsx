import React from 'react'
import {Link } from 'react-router-dom'

/**menuItem sera apenas para suporte do menu
 * sera recebido: icon, label, path
 * esta dentro de: 
 */
export default props =>(
    <li>
        {console.log(props.path)}
        <Link to={props.path}>
            <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
        </Link>
    </li>
)