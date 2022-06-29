const assert = require('assert')

// eslint-disable-next-line no-undef
describe('webpack.base.js test sace', () => {
    const baseConfig = require('../../lib/webpack.base')
    // eslint-disable-next-line no-undef
    it('entry', () => {
        assert.equal(baseConfig.entry.index, '/Users/wangshuangyan/learnspace/webpack4-demo/builder-webpack/test/smoke/template/src/index/index.js')
        assert.equal(baseConfig.entry.search, '/Users/wangshuangyan/learnspace/webpack4-demo/builder-webpack/test/smoke/template/src/search/index.js')
    })
})
