/* eslint-disable react/jsx-indent */
import React from 'react'
import ReactDOM from 'react-dom'
// import Common from '../commons/commons'
import largeNumberWsy from 'large-number-wsy'
import { funcA } from './tree-shaking'
// @ts-ignore
import qq from './images/qq.png'
// @ts-ignore
import jike from './images/jike.png'
import './search.less'

// eslint-disable-next-line no-constant-condition
if (false) {
    funcA()
}
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            Text: null,
        }
    }

    loadModule = () => {
        import('./test').then((res) => {
            this.setState({
                Text: res.default,
            })
        })
    }

    render() {
        const { Text } = this.state
        const result = largeNumberWsy('1234', '23')
        return (
            <div className="search-container">
                Search 内容
                <br />
                {result}
                {Text && <Text />}
                <img src={qq} alt="" />
                <img src={jike} alt="" />
                <button type="button" onClick={this.loadModule}>click me</button>
                {/* <Common /> */}
            </div>
        )
    }
}

ReactDOM.render(<Search />, document.getElementById('search'))
