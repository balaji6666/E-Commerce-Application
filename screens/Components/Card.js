import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const Card = props =>{
    return(
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{props.header}</Text>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                <FlatList data={props.images}
                renderItem={ itemData => (
                    <View style={styles.Container}>
                        <Image style={styles.image} source={itemData.item.image} />
                        <Text style={styles.text}>{itemData.item.textItem}</Text>
                        <Text style={styles.offerText}>{itemData.item.textOff}</Text>
                    </View>
                )}
                numColumns={2}/>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    
    headerContainer:{
        paddingLeft: 30,
        marginTop: 20,
    },

    header:{
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    cardContainer:{
        alignItems: 'center',
        marginVertical: 10,
    },

    card:{
        flex: 1,
        width: '90%',
        elevation: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },

    Container:{
        flex: 1,
        flexDirection: 'column', 
        borderColor:'black', 
        borderWidth:0.2 ,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image:{
        height: 80,
        width: 80,
        marginVertical: 20,
        resizeMode: 'contain',
        justifyContent: 'center',
    },

    text:{
        color: 'red',
    },

    offerText:{
        color: 'darkgreen',
        fontSize: 16,
    }

});

export default Card;