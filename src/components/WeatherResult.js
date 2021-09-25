import React from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native'



const WeatherResult = ({result, setResult, setThemeState}) => {
    
    if(!result.done) return null;
    
    const {name, main} = result.data;
    
    console.log(result);
    
    const kelvinDegree = 273.15;
    
    
    return (
        <View style={{flex:1, paddingHorizontal: 10}}>
            
            <View style={styles.viewHeader}>
                
                <Text style={styles.weatherCity}>
                    {name}
                </Text>
                
                <Text style={styles.weatherDescription}>"{result.data.weather[0].description}"</Text>
                
                <View style={styles.degreeContainer}>
                    
                    <Text style={styles.weatherDegrees}>
                        {parseInt(main.temp - kelvinDegree, 10)} 
                        <Text style={{fontSize: 20}}>
                            &#x2103;
                        </Text>
                    </Text>
                    
                    <Image
                        style={styles.weatherImage}
                        source={{uri: `http://openweathermap.org/img/w/${result.data.weather[0].icon}.png`}}
                    />
                    
                </View>
                
            </View>
            
            <View style={styles.viewBody}>
                
                <View style={{ flex: 1, paddingBottom: 15 }}>
                    <View style={styles.container}>
                        
                        <View style={[styles.minMax]}>
                            <Text style={styles.minMaxText}>
                                Min {''}
                                <Text style={{fontSize: 14}}>
                                    &#x2103;
                                </Text>
                            </Text>
                            
                            <Text style={styles.minMaxDegree}>
                                {parseInt(main.temp_min - kelvinDegree, 10)}
                                <Text style={{fontSize: 14}}>
                                    &#x2103;
                                </Text>
                            </Text>
                            
                        </View>
                        
                        <View style={[styles.minMax]}>
                            <Text style={styles.minMaxText}>
                                Max {''}
                                <Text style={{fontSize: 14}}>
                                    &#x2103;
                                </Text>
                            </Text>
                            
                            <Text style={styles.minMaxDegree}>
                                {parseInt(main.temp_max - kelvinDegree, 10)}
                                <Text style={{fontSize: 14}}>
                                    &#x2103;
                                </Text>
                            </Text>
                        </View>
                        
                    </View>
                    
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setResult({done: false, data:{}});
                        }}
                    >
                        <View style={styles.btnSearch}>
                            <Text style={styles.txtSearch}>Volver</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    viewHeader:{
        backgroundColor: 'rgba(255, 255, 255, .3)',
		flex: .1,
        borderRadius: 30,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    weatherCity:{
        fontSize: 30,
        color: '#fff',
        fontFamily: 'Raleway-Italic',
    },
    
    weatherDescription:{
        color: '#000',
        fontSize:15,
        marginTop: 5,
        fontFamily: 'Raleway-Italic',
    },
    
    degreeContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    weatherDegrees:{
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
    },
    
    weatherImage:{
        width:60, 
        height:60,
        marginLeft: 10
    },
    
    viewBody:{
        backgroundColor: 'rgba(255, 255, 255, .3)',
		flex: 1,
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40
    },
    
    container:{
        flex: 1,
        marginTop:25,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    
    minMax:{
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        flex: 1,
        height: 100,
        marginHorizontal: 8,
        paddingVertical: 5,
        justifyContent: 'space-around'
    },
    
    minMaxText:{
        fontFamily: 'Raleway-Regular',
        fontSize: 18
    },
    
    minMaxDegree:{
        fontSize: 24,
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

export default WeatherResult
