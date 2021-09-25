import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native'


const FormWeather = ({dataForm, setDataForm, setConsult, result}) => {
    
    const {city, country} = dataForm;
    
    const [animationButtom] = useState(new Animated.Value(1));
    
    const animationIn = () => {
        Animated.spring(animationButtom, {
            toValue: .75,
            useNativeDriver: true
        }).start();
    }
    
    const animationOut = () => {
        Animated.spring(animationButtom, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }
    
    const animationStyle = {
        transform: [{scale: animationButtom}]
    }
    
    const sendFormValues = () => {
        if(country.trim() === '' || city.trim() === ''){
            Alert.alert(
                'Error',
                'Completa los campos correctamente',
                [{text: 'Entendido'}]
            )
            return;
        }else{
            setConsult(true);
        }
    }
    
    if(result.done) return null;
    
    
    return (
        <View style={styles.viewForm}>
            <View style={styles.container}>
                <View>
                    <Picker
                        selectedValue={country}
                        onValueChange={(itemValue, itemIndex) =>
                            setDataForm({...dataForm, country: itemValue})
                        }
                        
                    >
                        <Picker.Item label='--- Seleccione un pais ---' value=''/>
                        <Picker.Item label='Argentina' value='AR'/>
                        <Picker.Item label='Chile' value='CH'/>
                        <Picker.Item label='Colombia' value='CO'/>
                        <Picker.Item label='Estados Unidos' value='US'/>
                        <Picker.Item label='México' value='MX'/>
                        <Picker.Item label='Perú' value='PE'/>
                    </Picker>
                    
                    <TextInput
                        placeholder='Ciudad'
                        placeholderTextColor='#666'
                        value={city}
                        onChangeText={ ciudad => setDataForm({...dataForm, city:ciudad})}
                        style= {styles.inputText}
                        
                    />
                </View>
                
                <TouchableWithoutFeedback
                    onPressIn={ () => animationIn() }
                    onPressOut={ () => animationOut() }
                    onPress={ () => sendFormValues() }
                >
                    <Animated.View style={[styles.btnSearch, animationStyle]}>
                        <Text style={styles.txtSearch}>Buscar</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    viewForm:{
        backgroundColor: 'rgba(255, 255, 255, .28)',
		flex: 1,
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40
    },
    container:{
        flex: 1,
        marginTop:25,
        paddingHorizontal: 10,
        justifyContent: 'space-around',
    },
    inputText: {
        fontSize: 15,
        borderBottomColor: '#000',
        backgroundColor: '#fff',
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderBottomWidth: 2,
        height:40,
        color: '#424141',
        marginTop: 40
    },
    btnSearch: {
        backgroundColor: '#3F51B5',
        borderRadius: 5,
        width: 150,
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    txtSearch:{
        color: '#FFFFFF',
        fontSize: 16
    }
})

export default FormWeather
