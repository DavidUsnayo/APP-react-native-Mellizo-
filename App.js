import React from 'react';
import { StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Puertas } from './screens/puertas';
import { HomeScreen } from './screens/home';
import { Closets } from './screens/closets';
import { Sillas } from './screens/sillas';
import { Otros } from './screens/otros';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Puertas" component={Puertas} />
        <Stack.Screen name="Closets" component={Closets} />
        <Stack.Screen name="Sillas" component={Sillas} />
        <Stack.Screen name="Otros" component={Otros} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    
});
