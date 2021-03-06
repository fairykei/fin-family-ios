import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../constants/loginStyles';
import { LinearGradient } from 'expo-linear-gradient';
// import {  } from 'react-native-gesture-handler';
import { navigation, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useInput } from '../hooks/useInput';
import { sendData } from '../hooks/sendData';
import { getCache } from '../hooks/getCache';

export default function Login(props) {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (evt) => {
		// evt.preventDefault();
		// save data locally
		async () => {
			const emailCache = ['@email', email];
			const passwordCache = ['@password', password];
			try {
				await AsyncStorage.multiSet([emailCache, passwordCache]);
			} catch (e) {
				console.log(e);
				//save error
			}
		};

		// set json and post login
		async (value) => {
			try {
				const jsonValue = JSON.stringify({
					email: getCache('email'),
					password: getCache('password'),
				});
				// await AsyncStorage.setItem('@cadastro', jsonValue);
				console.log(jsonValue);
				sendData('login', jsonValue);
				// await AsyncStorage.clear();
				return navigation.navigate('Groups');
			} catch (e) {
				console.log(e);
				// save error
			}
		};
	};

	return (
		<View style={styles.bg}>
			<LinearGradient
				colors={['rgba(52,202,154,0.8)', 'rgba(160,61,179,0.45)']}
				start={[0.5, 0.5]}
				end={[0.3, 1.0]}
				style={{ flex: 1 }}>
				<View style={styles.container}>
					<Text style={styles.title}>FinFamily</Text>
					<form>
						<TextInput
							style={styles.input}
							keyboardobype='email-address'
							textContentType='emailAddress'
							placeholder='E-Mail for access'
							value={email}
							onChangeText={(e) => setEmail(e)}
						/>
						<TextInput
							style={styles.input}
							type='password'
							secureTextEntry={true}
							placeholder='Password'
							value={password}
							onChangeText={(e) => setPassword(e)}
						/>
						<View style={styles.buttonForm}>
							<TouchableOpacity
								color='#3ED4AF'
								onPress={((evt) => evt.preventDefault(), handleSubmit)}>
								{/* <input type='submit' value='Login' /> */}
								<Text style={styles.txt}>Login</Text>
							</TouchableOpacity>
						</View>
					</form>

					<View style={styles.buttonHelp}>
						<TouchableOpacity color='#3ED4AF'>
							<Text style={styles.buttonHelp}>Need Help?</Text>
						</TouchableOpacity>
					</View>
				</View>
			</LinearGradient>
		</View>
	);
}
