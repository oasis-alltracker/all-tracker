import * as Keychain from 'react-native-keychain';

// Function to store the access token
const storeToken = async (tokenType, token) => {
  try {
    // Store the access token in the device's secure storage (Keychain on iOS, Keystore on Android)
    await Keychain.setGenericPassword(tokenType, token);
    console.log('Access token stored successfully!');
  } catch (error) {
    console.error('Error storing access token:', error);
  }
};



// Function to retrieve the access token
const getTokens = async (tokenType) => {
  try {
    // Retrieve the access token from the device's secure storage
    const credentials = await Keychain.getAllGenericPasswordServices();
    if (credentials && credentials.password) {
        for(credential in credentials){
            if(credential.user == "refresh_token"){
                // if token expired
                // delete all tokens
                // refresh token
            }
            else if(credential.user == "access_token"){
                    // if token expired
                    // request new access token
            }
        }
    } else {
      console.log('No access tokens found.');
      //delete all tokens
      //refresh app
      return null;
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

const deleteAccessToken = async () => {
    try {
      // Delete the access token from the device's secure storage
      await Keychain.resetGenericPassword();
      console.log('Access token deleted successfully!');
    } catch (error) {
      console.error('Error deleting access token:', error);
    }
  };