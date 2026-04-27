module.exports = {
  dependencies: {
    // This stops the "Duplicate Class / JAR" error on Android
    "react-native-worklets-core": {
      platforms: {
        android: null,
      },
    },
  },
};
