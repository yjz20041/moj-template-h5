module.exports = {
  sourceType: 'unambiguous',
  'presets': [
    ['@babel/preset-env', {
      'modules': false,
      'useBuiltIns': 'usage',
      'corejs': 3
    }],
    ['@babel/preset-react', {}]
  ],
  'plugins': [
    ['@babel/plugin-proposal-decorators', {'legacy': true}],
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-proposal-class-properties']
  ]
}