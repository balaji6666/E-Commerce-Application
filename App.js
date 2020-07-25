import DrawerOrg from './screens/DrawerOrg';
import React, { useEffect } from 'react';
import { View, ActivityIndicator,Text,Alert } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';
// import auth from '@react-native-firebase/auth';
// import * as firebase from "firebase";

const App = () => {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

//   const firebaseConfig =  {
//     apiKey: "AIzaSyDXts_z81jdPnBThNwrC-rEdwESyg89K_E",
//     authDomain: "e-commerce-b1423.firebaseapp.com",
//     databaseURL: "https://e-commerce-b1423.firebaseio.com",
//     projectId: "e-commerce-b1423",
//     storageBucket: "e-commerce-b1423.appspot.com",
//     messagingSenderId: "828771404482",
//     appId: "1:828771404482:web:4d8d2bd1ef23c009c1095b",
//     measurementId: "G-XHNS2RLH33"
//   };
//   // firebase.initializeApp(firebaseConfig)  
// // const check = firebase.apps.length ? firebase.initializeApp(firebaseConfig);
// const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
// ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
// : undefined);


// setTimeout(() => {
//   if (!firebase.apps.length) {
//       try {
//           firebase.initializeApp(firebaseConfig);
//           Alert.alert("Initialized firebase :"+firebaseConfig.appId);
//       } catch (err) {
//           console.log(err)
//       }
//   }

// }, 100)




  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
    hscreens: null,
    userType : null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          userType : action.userType,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          userType : action.userType,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
          
        };
      
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = 'hihi';
      const email = foundUser[0].email;
      const password = foundUser[0].password;
      const userType = foundUser[0].type;
      

   
      try {

        // await firebase.auth().signInWithEmailAndPassword(email, password);

        
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userType',userType);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: email, token: userToken,userType:userType });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async (foundUser) => {
      const userToken = 'hihi';
      const email = foundUser[0].email;
      const password = foundUser[0].password;
      const userType = foundUser[0].type;
     
      try {
        
        // await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userType',userType);

       
        dispatch({ type: 'REGISTER', id: email, token: userToken,userType:userType });
        // dispatch({ type: 'LOGIN', id: email, token: userToken,userType:userType });
      } catch (e) {
        console.log(e);
      }
    },

    
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  const hidden = ['Users','OTPAuth','SearchBar','EditProfile','ProductList','Admin'];

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);

      // Alert.alert("Initializing firebase");
      // firebase.initializeApp(firebaseConfig);


      let userToken;
      userToken = null;
      let userType;
      userType = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userType = await AsyncStorage.getItem('userType');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken ,userType:userType});
      
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
  {/* <Text>{'user : '+loginState.userType}</Text> */}
      { loginState.userToken !== null? (
        <DrawerOrg userType={loginState.userType}/>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;

