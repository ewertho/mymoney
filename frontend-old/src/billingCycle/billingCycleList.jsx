import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getList, showUpdate, showRemove} from './billingCycleActions'


class BillingCycleList extends Component{

    componentWillMount(){
        this.props.getList()
    }

    renderRows(){
        const list = this.props.list || []
        return list.map(bc =>(
            <tr key={bc._id}>
                <td>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
                <td>
                    <button className='btn btn-warning' onClick={()=> this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={()=> this.props.showRemove(bc)}>
                        <i className='fa fa-trash'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render(){
        
        return(
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
/**billingCyle é um reducer que fica disponivel "globalmente" atraves do Provider
 * dentro dele tem algumas actions, uma delas, a BILLING_CYCLES_FETCHED tem o elemento list
 * que foi preenchido com todos os elementos da base atraves de um get via axios
 */
const mapStateToProps = state =>({list: state.billingCycle.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showRemove}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)