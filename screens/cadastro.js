import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from '../constants/loginStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Input } from 'react-native-elements';
import { navigation, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useInput } from '../hooks/useInput';
import { sendData } from '../hooks/sendData';
import { getCache } from '../hooks/getCache';

// TODO: Icons in inputs + phone field css

export default function Cadastro(props) {
	const navigation = useNavigation();
	const Cadastro1 = () => {
		const [nome, setNome] = useState('');
		const [cpf, setCpf] = useState('');
		const [dob, setDob] = useState('');
		let cpfField = '';
		let datetimeField = '';

		const handleSubmit = (evt) => {
			// check data before next screen
			// const cpfIsValid = cpfField.isValid();
			// const dobIsValid = datetimeField.isValid();
			// if (cpfIsValid && dobIsValid) {
			// save data locally
			async () => {
				const nomeCache = ['@nome', nome];
				const cpfCache = ['@cpf', unmaskedCpf];
				const dobCache = ['@dob', dob];
				try {
					await AsyncStorage.multiSet([nomeCache, cpfCache, dobCache]);
				} catch (e) {
					console.log(e);
					//save error
				}
			};
			return navigation.navigate('Cadastro2');
			// } else if (!cpfIsValid) {
			// 	setCpf('');
			// 	return () =>
			// 		Alert.alert('Invalid CPF', 'Check your CPF.', [{ text: 'OK' }], {
			// 			cancelable: false,
			// 		});
			// } else if (!dobIsValid) {
			// 	setDob('');
			// 	return () =>
			// 		Alert.alert(
			// 			'Invalid date input',
			// 			'Check your birth date.',
			// 			[{ text: 'OK' }],
			// 			{
			// 				cancelable: false,
			// 			}
			// 		);
			// }
		};

		return (
			<View style={styles.bg}>
				<LinearGradient
					colors={['rgba(52,202,154,0.8)', 'rgba(160,61,179,0.45)']}
					start={[0.5, 0.5]}
					end={[0.3, 1.0]}
					style={{ flex: 1 }}>
					<View style={styles.container}>
						<Text style={styles.titleCreate}>Create Account</Text>
						<Text style={styles.subtitle}>Personal Information</Text>
						<View style={styles.form}>
							<form onSubmit={handleSubmit}>
								<Input
									leftIcon={
										<Icon
											name='perm-identity'
											type='material'
											color='#rgba(0,0,0,0.7)'
										/>
									}
									leftIconContainerStyle={{ marginLeft: 15, marginRight: 5 }}
									inputContainerStyle={styles.input}
									placeholder='Name'
									value={nome}
									onChangeText={(e) => setNome(e)}
								/>
								<Input
									leftIcon={
										<Icon
											name='fingerprint'
											type='material'
											color='#rgba(0,0,0,0.7)'
										/>
									}
									leftIconContainerStyle={{ marginLeft: 15, marginRight: 5 }}
									inputContainerStyle={styles.input}
									placeholder='CPF'
									value={cpf}
									includeRawValueInChangeText={true}
									onChangeText={(e) => setCpf(e)}
								/>
								<Input
									leftIcon={
										<Icon
											name='cake'
											type='material-outline'
											color='#rgba(0,0,0,0.7)'
										/>
									}
									leftIconContainerStyle={{ marginLeft: 15, marginRight: 5 }}
									inputContainerStyle={styles.input}
									value={dob}
									onChangeText={(e) => setDob(e)}
									ref={(ref) => {
										datetimeField = ref;
									}}
									placeholder='Birth date'
								/>
								<View style={styles.buttonForm}>
									<TouchableOpacity color='#3ED4AF'>
										{/* <input type='submit' value='Next' /> */}
										<Text
											style={styles.txt}
											onPress={((evt) => evt.preventDefault(), handleSubmit)}>
											Next
										</Text>
									</TouchableOpacity>
								</View>
							</form>
						</View>

						<View style={styles.buttonHelp}>
							<TouchableOpacity color='#3ED4AF'>
								<Text style={styles.buttonHelp}>Need Help?</Text>
							</TouchableOpacity>
						</View>
					</View>
				</LinearGradient>
			</View>
		);
	};
	return <Cadastro1 />;
}
