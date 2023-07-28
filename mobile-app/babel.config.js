module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['module:react-native-dotenv',
     'react-native-reanimated/plugin',
      ['module-resolver',
        {
          root: ['./mobile-app'],
          extensions: ['.png', '.js', '.ios.js', '.android.js', '.json'],
          alias: {
            '@assets': 'mobile-app/src/assets'
          }
        }]]
  };
};
