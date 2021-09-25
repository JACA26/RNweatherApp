import React, { useEffect, useState } from 'react';
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import WeatherIcon2 from './src/icons/WeatherIcon2';
import LinearGradient from 'react-native-linear-gradient';
import FormWeather from './src/components/FormWeather';
import WeatherResult from './src/components/WeatherResult';


const themes = {
	defaultTheme: ['#4791ad', '#096779', '#00d4ff'],
	hotTheme2: ['#cd7b47', '#f7a192', '#eb5402'],
	rainTheme: ['#4e4a4a', '#bfd0ea', '#787b81'],
}


const App = () => {
	
	const [themeState, setThemeState] = useState(themes.defaultTheme)
	
	const [dataForm, setDataForm] = useState({
		city:'',
		country:''
	});
	
	const {city, country} = dataForm;
	
	const [consult, setConsult] = useState(false);
	const [result, setResult] = useState({done: false, data:{}});
	
	const mostrarAlerta = (message) => {
		Alert.alert('Oops!', message, [{text: 'Entendido'}])
	}
	
	
	/* Change color theme */
	useEffect(() => {
		
		const changeTheme = () => {
			
			const kelvinDegree = 273.15;
			
			if(result.done){
				const valueDegree = result.data.main.temp - kelvinDegree;
				
				if( valueDegree < 10){
					setThemeState(themes.rainTheme);
				}else if( valueDegree > 10 && valueDegree < 23){
					setThemeState(themes.defaultTheme);
				}else{
					setThemeState(themes.hotTheme2);
				}
				
			} else {
				setThemeState(themes.defaultTheme);
			}
			
		}
		
		changeTheme();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [result.done])
	
	
	/* Consult to api */
	useEffect(() => {
		
		const apiRequest = async () => {
			
			if(consult){
				//consultar api
				const apiKey = 'f90ae9552f43ffb034746636647b604a';
				
				const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&lang=es`;
				
				
				try {
					const response = await fetch(url);
					const dataResult = await response.json();
					
					if(dataResult.cod === '400' || dataResult.cod === '404'){
						mostrarAlerta('Ciudad no encontrada!');
						setDataForm({
							city:'',
							country:''
						});
						setConsult(false);
						
					}else {
						
						setResult({
							done: true,
							data: dataResult
						});
						
						setConsult(false);
						
						setDataForm({
							city:'',
							country:''
						})
					}
					
					
				} catch (error) {
					mostrarAlerta('Algo salió mal!');
					setConsult(false);
				}
			}
		}
		
		apiRequest();
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [consult]);
	
	
	return (
		
		<ScrollView contentContainerStyle={{flexGrow: 1}}>
			<LinearGradient 
				colors={themeState} 
				style={styles.linearGradient}
				start={{ x: 2, y: 0.5 }} end={{ x: .5, y: 0}}
			>
				<View style={styles.heading}>
					<Text style={styles.headingText}>Weather{'\n'} App</Text>
					<WeatherIcon2 />
				</View>
				
				<FormWeather 
					dataForm={dataForm}
					setDataForm={setDataForm}
					setConsult={setConsult}
					result={result}
				/>
				
				<WeatherResult 
					result={result}
					setResult={setResult}
					setThemeState={setThemeState}
				/>
				
			</LinearGradient>
		</ScrollView>
		
	);
};

const styles = StyleSheet.create({
	
	heading:{
		alignItems:'center',
		marginBottom: -70
	},
	
	headingText: {
		fontSize: 30,
		textAlign: 'center',
		fontFamily: 'Raleway-Italic',
		color: '#fff',
		marginTop: 25,
	},
	
	linearGradient: {
		flex:1,
	},
	
})

export default App;
