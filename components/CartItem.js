import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";

import { Text, Badge, Button } from "react-native-elements";
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import ButtonAddRemove from "./Buttons/AddRemoveButton";
import AppButton from './Buttons/AppButton';

const CartItem = ({ data, onAddItem, onRemoveItem }) => {
  const {id, name,price,qty ,category,description} = data.item;

const [currentQty,setCurrentQty] = React.useState(qty);
const [currentItem,setCurrentItem] = React.useState(data.item);

React.useEffect(() => {
  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.firebaseConfig);
  }
console.log(currentItem);

  firebase.database().ref('/cart/'+id).once('value', (data) => {
     

    if (data.val()) {
              
      

            var temp = data.val();
           setCurrentItem(temp);
      
          

            }
  });
    
}, []);

const add = () => {

  

  // firebase.database().ref('/cart/'+id).once('value', (data) => {
     

  //   if (data.val()) {
              
      setCurrentQty(currentQty+1);

            var temp = currentItem;
            temp.qty = currentQty+1;
      
            setCurrentItem(temp);

            firebase.database().ref('/cart/'+id).set(currentItem).then(( 
            ) => {
            }).catch((error) => {
                console.log(error);
            });

  //           }
  // });


}

const remove = () => {

  setCurrentQty(currentQty-1);

  var temp = currentItem;
  temp.qty = currentQty-1;

  setCurrentItem(temp);

  firebase.database().ref('/cart/'+id).set(currentItem).then(( 
  ) => {
  }).catch((error) => {
      console.log(error);
  });

}

  // let currentQty = qty;

  return (
    <View style={styles.smallCard}>
      <View style={styles.productInfo}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.resturentTitle}>
          {category.toString().toUpperCase()}
        </Text>
        <Text style={styles.foodDescription}>{description}</Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.price}>₹{price}</Text>
        {/* <Text style={styles.price}>₹{_id}</Text> */}
        <View style={styles.countView}>
        <TouchableOpacity style={styles.options} >
<AppButton
            height={35}
            width = {35}
            title="-"
            onTap={() =>
        remove()  

            }
          />
</TouchableOpacity>

          <Text
            h4
            style={{ alignSelf: "center", margin: 5, fontWeight: "600" }}
          >
            {currentQty}
          </Text>
          <TouchableOpacity style={styles.options} >
<AppButton
            height={35}
            width = {35}
            title="+"
            onTap={() =>
            //  Alert.alert("Add")
            add()
            }
          />
</TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
  },
  smallCard: {
    flex: 1,
    minHeight: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "300",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resturentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 4,
    display: "flex",
    color: "#565555",
  },
  foodDescription: {
    fontSize: 16,
    fontWeight: "300",
    display: "flex",
    color: "#565555",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    display: "flex",
    color: "#EA5656",
    alignSelf: "center",
  },
  foodImageSmall: {
    borderRadius: 10,
    height: 99,
    width: 99,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#581845",
    alignSelf: "center",
  },
  rating: {
    alignSelf: "flex-start",
  },
  productInfo: {
    flex: 9,
    justifyContent: "space-around",
  },

  priceView: {
    flex: 3,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  countView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 8,
  },
  badge: {
    backgroundColor: "green",
  },
  //Button
  btnAddRemove: {
    borderColor: "#f15b5d",
    borderRadius: 5,
    borderWidth: 0.5,
  },
  btnTitleStyle: {
    color: "#f15b5d",
  },
});

export default CartItem;