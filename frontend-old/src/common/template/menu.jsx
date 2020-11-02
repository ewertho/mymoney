import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './MenuTree'

/**recebido:
 * passara: path, label, icon
 * contem: MenuItem
 * esta em:
 */
export default props =>(
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard' icon='dashboard'/>
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='#billingCycles' label='Ciclos de Pagamentos'
                icon='usd'/>
        </MenuTree>
    </ul>
)