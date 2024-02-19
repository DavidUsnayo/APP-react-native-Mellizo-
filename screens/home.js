import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, Text, View,
    TouchableOpacity, ImageBackground, 
    Image,TextInput, Linking,
} from 'react-native';
import Constants from 'expo-constants';

export function HomeScreen({ navigation }) {
    const [entrada, setEntrada] = useState('')

    function buscar(){
        Linking.openURL(`https://www.pinterest.es/search/pins/?q=${entrada}&rs=typed`)
        setEntrada('')
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Image source={require('../assets/mellizo.png')} style={{width:'94%',height:150, borderRadius:20, marginTop:15}}/>
            <View style={styles.buscador}>
                <Image style={{width:35,height:35,}} source={require('../assets/pinterest.png')}/>
                <TextInput style={styles.input} onChangeText={(e)=>setEntrada(e)} placeholder='Buscar en Pinterest'>{entrada}</TextInput>
                <TouchableOpacity onPress={buscar}>
                    <Text style={{color:'#f5f5f5',fontWeight:'bold'}}>BUSCAR</Text>
                </TouchableOpacity>
            </View>
            <Text style={{width:'90%', fontSize:20,margin:10, fontWeight:'bold'}}>Categorias</Text>
            <View style={styles.box_caja}>
                <TouchableOpacity style={styles.caja} onPress={() => navigation.navigate('Puertas')}>
                    <ImageBackground source={require('../assets/M3.jpg')} style={styles.imagenFondo}>
                            <View style={styles.boton}>
                                <Text style={styles.subTitle}>PUERTAS</Text>
                                <Image source={require('../assets/puerta4.png')} style={{width:30,height:30,borderRadius:40}}/>
                            </View>
                    </ImageBackground>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.caja} onPress={() => navigation.navigate('Closets')}>
                    <ImageBackground source={require('../assets/M4.jpg')} style={styles.imagenFondo}>
                            <View style={styles.boton}>
                                <Text style={styles.subTitle}>CLOSETS</Text>
                                <Image source={require('../assets/closet.png')} style={{width:30,height:30,borderRadius:40}}/>
                            </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={styles.box_caja}>
                <TouchableOpacity style={styles.caja} onPress={() => navigation.navigate('Sillas')}>
                    <ImageBackground source={require('../assets/M1.jpg')} style={styles.imagenFondo}>
                            <View style={styles.boton}>
                                <Text style={styles.subTitle}>SILLAS</Text>
                                <Image source={require('../assets/silla.png')} style={{width:30,height:30,borderRadius:40}}/>
                            </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.caja} onPress={() => navigation.navigate('Otros')}>
                    <ImageBackground source={require('../assets/M2.webp')} style={styles.imagenFondo}>
                            <View style={styles.boton}>
                                <Text style={styles.subTitle}>OTROS</Text>
                                <Image source={require('../assets/muebles.png')} style={{width:30,height:30,borderRadius:40}}/>
                            </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    width:'100%',
    backgroundColor: '#f5f5f5',
    //backgroundColor:'#d83848',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
},
title: {
    fontSize: 40,
    fontWeight: 'bold',
},
subTitle: {
    fontSize: 20,
    fontWeight:'bold',
    color:'white',
    borderRadius:10
},
box_caja: {
    flexDirection: 'row',
    marginBottom: 10,
},
caja: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius:10,
    margin: 5,
    width:'45%',
    height:250,
    overflow:'hidden',
},
imagenFondo:{
    width: '100%', 
    height:'100%',
    alignItems:'center',
    justifyContent:'flex-end'
},
boton:{
    backgroundColor:'rgba(0, 0, 0, .5)',
    padding:7,
    justifyContent:'space-between',
    alignItems:'center', 
    borderRadius:10,
    margin:10 ,
    flexDirection:'row',
    width:'90%'
},
buscador:{
    // backgroundColor:'#e3243d',
    backgroundColor:'black',
    flexDirection:'row',
    width:'92%',
    padding:12, 
    borderRadius:10, 
    justifyContent:'space-between',
    alignItems:'center',
    margin:10
},
input:{
    width:'70%',
    fontSize:15,
    backgroundColor:'#f7f7f7',
    color:'black',
    padding:4,
    borderRadius:5
}
});
