import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {selectTab} from './tabActions'
import If from '../operador/if'

/**
 * selectTab vai pegar o que vier do target que ta descrido no billingCycle
 * como o evento não diretamente é necessario fazer uma função arrow
 * mapDispatchToProps ira diparar a ação que no final ira retornar o nome da tab selecionada
 */

class tabHeader extends Component{
    render(){
        const selected =  this.props.tab.selected === this.props.target
        const visible = this.props.tab.visible[this.props.target]
        return(
            <If test={visible}>
                <li className={selected ? 'active' : ''}>
                    <a href='javascript:;' onClick={()=> this.props.selectTab(this.props.target)}
                        data-target={this.props.target}  data-toggle='tab'>
                            <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
                    </a>
                </li>
            </If>
            
        )
    }
}
const mapStateToProps = state => ({tab: state.tab})
const mapDispatchToProps = dispatch => bindActionCreators({selectTab}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(tabHeader)