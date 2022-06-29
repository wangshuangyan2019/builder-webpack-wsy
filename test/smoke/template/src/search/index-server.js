/* eslint-disable react/jsx-indent */
const React = require('react')
const largeNumberWsy = require('large-number-wsy')
// @ts-ignore
const qq = require('./images/qq.png')
// @ts-ignore
const jike = require('./images/jike.png')
// @ts-ignore
require('./search.less')

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
                <img src={qq.default} alt="" />
                <img src={jike.default} alt="" />
                <button type="button" onClick={this.loadModule}>click me</button>
            </div>
        )
    }
}

module.exports = <Search />
