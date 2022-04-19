const path = require('path')
const image = require('@rollup/plugin-image')

module.exports = {
  rollup(config, options) {
    config.plugins = [image(), ...config.plugins]
    // export in separate dist/esm and dist/cjs directories
    delete config.output.file
    config.output.dir = path.join(__dirname, `dist/${options.format}`)
    return config
  },
}
