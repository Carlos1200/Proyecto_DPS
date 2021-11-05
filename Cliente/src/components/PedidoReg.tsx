import React, { useContext, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Pedido } from "../interfaces";
import { Producto } from "../interfaces"
import Api from '../api'


interface Props {
  pedido: Pedido;
  //openModal: (pedidoRef: Pedido) => void
}

export const PedidoReg = ({ pedido/*,openModal*/ }: Props) => {
  
  const {
    theme: {
      colors: { text, background, primary },
      dark,
    },
  } = useContext(ThemeContext);

  const [opacity, setOpacity] = useState(1);

  const { _id, estado, creado, cantidad, total, comprador, producto } = pedido;
  
  const eliminarPedido = async() =>{
    try{
      if(estado === 'Completado'){
        await Api.delete(`/pedidos/${_id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Pressable
      style={[styles.contenedor,{opacity}]}
      //onLongPress={()=>openModal(pedido)}
      onPressIn={() => setOpacity(0.8)}
      onPressOut={() => setOpacity(1)}
    >
      {pedido.producto[0]?(
        <>
          <Image
            source={{uri:pedido.producto[0].foto}}
            style={styles.img}
          />
          <View style={[styles.contenedorinfo, {paddingBottom:30}]}>
            <Text style={styles.title}>{pedido.producto[0].nombre}</Text>
            <Text style={styles.label}>Cantidad: {cantidad}</Text>
            <Text style={[styles.label,{color:estado==="Pendiente"?"red":"green"}]}>Estado: {estado}</Text>
          </View>
          <Text style={[styles.price, {color:primary}]}>$ {pedido.producto[0].precio}</Text>
          <TouchableOpacity>
            <Ionicons name='close' color='red' style={styles.btn} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnComplete}>
            <Text>Completado</Text>
          </TouchableOpacity>
        </>
      ):null}

    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 25,
    borderRadius: 20,
    flexDirection: 'row'
  },
  img:{
    width: 110,
    height: 110,
    margin: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  contenedorinfo:{
    marginVertical: 15,
    width: '100%',
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 7,
  },
  label:{
    fontSize: 20,
    marginTop: 7,
  },
  price:{
    position: 'absolute',
    bottom: 6,
    right: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  btn:{
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 25,
  },
  btnComplete:{
    borderRadius: 20,
    backgroundColor: 'green',
    paddingVertical:50,
    paddingHorizontal:50,
  }
});
