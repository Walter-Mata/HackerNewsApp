module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-redux|@react-native|react-native-webview|@react-navigation|react-native|@react-native-community|@react-navigation/native)/)'
  ],
};
