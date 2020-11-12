import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  authContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  companyName: {
    textAlign: 'center',
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    fontSize: 16,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 4,
  },
  authButtonDiv: {
    flexDirection: 'column',
    marginTop: 25,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
    textTransform: 'capitalize',
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 20,
  },

  inputCardMainDiv: {
    flex: 1,
    height: '100%',
    width: '90%',
    maxWidth: 600,
    justifyContent: 'center',
    marginTop: 35,
    marginBottom: 50,
  },

  leftIconStyle: {
    position: 'relative',
    left: 13,
    top: 35,
    opacity: 0.5,
  },

  rightIconStyle: {
    position: 'absolute',
    right: 13,
    opacity: 0.6,
  },
});
