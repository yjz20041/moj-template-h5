const rem = function (px) {
  return (px / 1242 * 100).toFixed(6) + 'vw'
}

module.exports = {
  plugins: {
    'autoprefixer': {},
    'precss': {},
    'postcss-functions': { functions: { rem } }
  }
}
