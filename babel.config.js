// eslint-disable-next-line no-undef
module.exports = {
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
  },
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-runtime',
  ],
};
