import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoContainer: {
    width: 80,
    height: 80,
    padding: 10,
    borderRadius: 80,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  logo: {
    width: 50,
    height: 50
  },
  textContainer: {
    width: '80%'
  },
  mainTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffff',
    textAlign: 'center',
    margin: 5
  },
  secTxt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffff',
    textAlign: 'center',
    margin: 5
  },
  arrowContainer: {
    alignSelf: 'center',
    marginTop: 20
  },
  arrow: {
    width: 30,
    height: 30,
    margin: 10
  }
});

export default styles;
