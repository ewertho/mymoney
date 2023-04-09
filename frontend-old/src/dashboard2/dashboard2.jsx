import React, {Component} from 'react'
import axios from 'axios'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'

const BASE_URL = 'http://localhost:3003/api'

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {credit: 0, debt: 0}
    }

    componentWillMount(){
        axios.get(`${BASE_URL}/billingCycles/summary`)
            .then(resp=> this.setState(resp.data))
    }

    render(){
        const {credit, debt} = this.state
        return(
            <div>
                <ContentHeader title='Dashboard' small='Versão 2.0'/>
                <Content>
                    <ValueBox cols='12 4' color='green' icon='bank'
                        value={`R$ ${credit}`} text='Total de Creditos'/>
                    <ValueBox cols='12 4' color='red' icon='credit-card'
                        value={`R$ ${debt}`} text='Total de Debitos'/>
                    <ValueBox cols='12 4' color='blue' icon='money'
                        value={`R$ ${credit-debt}`} text='Valor consolidado'/>
                </Content>
            </div>
        )
    }
}

export default (Dashboard)