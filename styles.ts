import { StyleSheet, TouchableOpacityBase } from "react-native";

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },
  map: {
    flex: 1,
    width: '100%'
  },

    buttonContainer: {
      position: 'absolute',
      bottom: '35%',
      left: '22%',
      alignSelf: 'center',
      opacity: 1,
      zIndex: 30,
    },
    button: {
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
      borderRadius: 100,
      width: 200,
      height: 200,
      paddingHorizontal: 20,
      paddingVertical: 10,
      
    },
    buttonText: {
      color: 'rgba(240, 248, 255, 1)',
      fontSize: 30,
      fontWeight: 'bold',
      alignItems: 'center',
      left: '15%',
      top: '38%',
    },
    clearRoutesButton: {
      position: 'absolute',
      top:'5%',
      left:'5%',
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 24,
      marginVertical: 10,
    },
    clearRoutesButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },

});