import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Alert, Clipboard, StatusBar, TouchableOpacity } from 'react-native';
import * as Crypto from 'expo-crypto';

const getAvailableRoutes = navigation => {
    let availableRoutes = [];
    if (!navigation) return availableRoutes;

    const parent = navigation.dangerouslyGetParent();
    if (parent) {
        if (parent.router && parent.router.childRouters) {
            // Grab all the routes the parent defines and add it the list
            availableRoutes = [
                ...availableRoutes,
                ...Object.keys(parent.router.childRouters),
            ];
        }

        // Recursively work up the tree until there are none left
        availableRoutes = [...availableRoutes, ...getAvailableRoutes(parent)];
    }

    // De-dupe the list and then remove the current route from the list
    return [...new Set(availableRoutes)].filter(
        route => route !== navigation.state.routeName
    );
};

export default function Pass({navigation}) {
  const [value, onChangeText] = useState('');
  const [pass, onChangePass] = useState('');

  async function runCrypto() {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA1,
        value,
        { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    onChangePass(digest)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#09a261' />
      <View style={styles.header}>
        <Text style={styles.text}>Bem Vindo ao Gerador de Senhas!</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxGreen}>Com esse aplicativo você podera gerar senhas seguras e criptografadas!</Text>
      </View>
      <View style={styles.boxWrap}>
        <Text style={styles.textInput}>Digite uma palavra para gerar uma senha!</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <View style={styles.buttonGreen}>
          <Button
            title="Gerar Senha"
            color="#09a261"
            onPress={() => value === '' ? onChangePass('Insira um texto') : runCrypto(value)}
            />
        </View>
        <View style={styles.boxPassword}>
          <Text style={styles.titlePass} >Senha Gerada</Text>
          <Text style={styles.pass}>{pass}</Text>
          <Button color='red' title="Copiar Senha" onPress={ () => {
            Clipboard.setString(pass);
            Alert.alert('Senha Copiada para a área de transferência');
        }} />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonTouch} >
            <Text style={{color: 'white'}}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonTouch: {
    alignItems: "center",
    backgroundColor: "#09a261",
    color: 'red',
    padding: 10,
    marginTop: 20,
  },
  header: {
    justifyContent: 'center',
    backgroundColor: '#09a261',
    height: 20,
    width: '100%',
    textAlign: 'left',
    padding: 20,
    paddingTop: 50,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textInput: {
    color: '#09a261',
    fontSize: 16,
    padding: 20,
    paddingBottom: 5,
    textAlign: 'center',
  },
  boxGreen: {
    borderWidth: 2,
    borderColor: '#09a261',
    padding: 20,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10,
  },
  box: {
    padding: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#09a261',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
  },
  buttonGreen: {
    width: '100%',
    marginTop: 20,
  },
  boxPassword: {
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#09a261',
    width: '100%',
    padding: 20,
  },
  titlePass: {
    textDecorationLine: 'underline',
    width: '100%',
    textAlign: 'center',
  },
  pass: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'red',
    padding: 10
  },
  boxWrap: {
    marginRight: 20,
    marginLeft: 20,
    width: '80%'
  }
});
