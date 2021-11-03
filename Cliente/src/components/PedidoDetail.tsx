import React,{useContext} from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { useBottomSheet } from "@gorhom/bottom-sheet";
import {ThemeContext} from '../context/theme/ThemeContext';
import {Pedido} from '../interfaces'
import {Btn} from './Btn'
interface Props {
    pedido: Pedido;
}

const PedidoDetail = ({pedido}:Props) => {

    const {theme:{colors:{text}}}=useContext(ThemeContext);
    const { close } = useBottomSheet();
    return (
        <View style={styles.contenedor}>
            
            {pedido.producto[0]?(
                <>
                <View style={styles.header}>
                    <Text
                    style={[styles.title, { color: text, borderBottomColor: text }]}>
                    {pedido.producto[0].nombre}
                    </Text>
                    <Image source={{ uri: pedido.producto[0].foto }} style={styles.imagen} />
               </View>
               <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}>
                    <Text style={[styles.label, { color: text }]}>
                        Año: {pedido.producto[0].year}
                    </Text>
                    <Text style={[styles.label, { color: text }]}>
                        Precio: $ {pedido.producto[0].precio}
                    </Text>
                </View>
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop:15
                }}>
                    <Text style={[styles.label, { color: text }]}>
                        Cantidad Pedida: {pedido.cantidad}
                    </Text>
                    <Text style={[styles.label, { color: text }]}>
                        Total: $ {pedido.total}
                    </Text>
                </View>
                <Btn title="Cerrar" onpress={()=>close()}
                    style={{
                        width: "100%",
                    }}
                />
               </>
            ):null}
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
      marginHorizontal: 30,
    },
    header: {
      alignItems: "center",
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 15,
      borderBottomWidth: 2,
    },
    imagen: {
      height: 250,
      width: 250,
      alignSelf: "center",
      resizeMode: "contain",
    },
    label: {
      fontSize: 23,
      fontWeight: "bold",
      marginTop: 10,
    },
    info: {
      fontSize: 18,
    },
    icons: {
      fontSize: 30,
      fontWeight: "bold",
      marginHorizontal: 10,
    },
  });

export default PedidoDetail

