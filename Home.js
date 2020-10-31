import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StatusBar
} from 'react-native';

const getAvailableRoutes = navigation => {
    let availableRoutes = [];
    if (!navigation) return availableRoutes;

    const parent = navigation.dangerouslyGetParent();
    if (parent) {
        if (parent.router && parent.router.childRouters) {
            availableRoutes = [
                ...availableRoutes,
                ...Object.keys(parent.router.childRouters),
            ];
        }
        availableRoutes = [...availableRoutes, ...getAvailableRoutes(parent)];
    }
    return [...new Set(availableRoutes)].filter(
        route => route !== navigation.state.routeName
    );
};

export default function Home({navigation}) {

  return (
    <>
        <StatusBar backgroundColor='#09a261' />
        <SafeAreaView style={styles.container}>

            <View style={styles.view}>
                <Text style={styles.title}>Gerador de Senhas</Text>
                <Icon name="lock" size={200} color="#fff" />

                <TouchableOpacity onPress={() => navigation.navigate('Pass')} style={styles.button} >
                    <Text>Acessar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
      alignItems: "center",
      backgroundColor: "#fff",
      color: 'red',
      padding: 10
  },
  view: {
    flex: 1,
    backgroundColor: '#09a261',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
      color: 'white',
      fontSize: 30,
      marginBottom: 20,
      fontWeight: 'bold',
  }
});
