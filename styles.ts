import { StyleSheet, TouchableOpacityBase } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },

    map: {
      flex: 1,
      width: '100%',
    },

    buttonContainer: {
      position: 'absolute',
      bottom: '37%',
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
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      alignItems: 'center',
      left: '15%',
      top: '50%',
      bottom: '50%',
    }
    

});