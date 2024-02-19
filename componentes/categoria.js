import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, Modal} from 'react-native';

import ImageZoomViewer from 'react-native-image-zoom-viewer';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Categoria({valor='puertas'}) {
    const [modalVisible, setModalVisible] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)
    const [data, setData] = useState()
    const [visibleButtons, setVisibleButtons] = useState([])

    const toggleModal = (id) => {
        setModalVisible(true)
        setSeleccionado(id)
    };
const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8,
        });
        if (!result.cancelled) {
            guardar(result.assets[0].uri)
        }
    };
async function guardar(ruta){
        let nuevo = {url:ruta}
        let obj = JSON.parse(await AsyncStorage.getItem(valor))
        obj.unshift(nuevo)
        await AsyncStorage.setItem(valor, JSON.stringify(obj));
        setData(JSON.parse(await AsyncStorage.getItem(valor)))
        console.log('esto es:', data)
    }
    
    useEffect(() => {
        async function getUsuarios() {
            const us = await AsyncStorage.getItem(valor)
            if (us) {
                setData(JSON.parse(us))
            } else {
                const defaultValue = []
                await AsyncStorage.setItem(valor, JSON.stringify(defaultValue))
                setData(defaultValue)
            }
        }
        getUsuarios();
    }, []);

const onLongPress = (index) => {
    console.log('¡Presión larga detectada!');
    const newVisibility = [...visibleButtons];
    newVisibility[index] = !newVisibility[index];
    setVisibleButtons(newVisibility);
};

async function borrar(id){
    console.log(1)
    let obj = JSON.parse(await AsyncStorage.getItem(valor))
    obj.splice(id,1)
    await AsyncStorage.setItem(valor, JSON.stringify(obj));
    setData(JSON.parse(await AsyncStorage.getItem(valor)))
    onLongPress(id)
}

    return (
        <View style={{ flex: 1, alignItems: 'center', }}>
            <TouchableOpacity onPress={pickImage} style={{backgroundColor:'skyblue', width:'95%',overflow:'hidden',borderRadius:10,margin:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}> 
                <Image source={require('../assets/muebles.png')} style={{width:30,height:30,borderRadius:40,margin:10}}/>
                <Text style={{color:'white',fontWeight:'bold',backgroundColor:'#009dff',padding:15}}>Subir Imagen de {valor}</Text> 
            </TouchableOpacity>
            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
                {
                    data && data.map((da, i) => (
                        <TouchableOpacity key={i} onPress={()=>toggleModal(i)} onLongPress={()=>onLongPress(i)}>
                            <Image style={styles.image} source={{ uri:da.url }}/>
                            <TouchableOpacity style={{position:'absolute',top:0,width:'92%',marginLeft:5,display: visibleButtons[i] ? 'flex' : 'none'}} onPress={()=>borrar(i)}>
                                <Text style={{backgroundColor:'#db162d',color:'white',padding:10,textAlign:'center',borderRadius:10}}>Borrar</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
                <Modal visible={modalVisible} transparent={true}>
                    <TouchableOpacity onPress={()=> setModalVisible(false)} style={{position:'absolute',left:0,top:0, backgroundColor:'black',padding:10,margin:10,borderRadius:40,zIndex:20}}>
                        <Text style={{fontSize:25,color:'white'}}> ⪡ </Text>
                    </TouchableOpacity>
                    <ImageZoomViewer imageUrls={data} index={seleccionado}/>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
image: {
    width: 120,
    height: 120,
    margin: 5,
    borderRadius:10,
},
modal: {
    backgroundColor:'rgba(0, 0, 0, .5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
modalImage: {
    resizeMode:'contain',
    width: '95%',
    height: '100%',
    borderRadius:10,
},
});