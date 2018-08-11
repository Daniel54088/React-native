import React from 'react';
import { StyleSheet,  View,  Image, TextInput, Text, Button, Alert, ScrollView, StatusBar, ImageBackground,TouchableOpacity,Navigator,ListView} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Tabtest from './tab/Tabtest.js';


let BasketballTeam = [
    {name:"lakers",selected:false},
    {name:"caliviers",selected:false},
    {name:"goldenstate",selected:false},
    {name:"wizard",selected:false},
    {name:"king",selected:false},
];

class First extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      chooseArray: [],
    };
    this.changeHeaderRightText = this.changeHeaderRightText.bind(this);

  }

  static navigationOptions = ({ navigation }) =>{ //First頁的 navigator bar 內容

    return {
      title: '選擇您感興趣的',
      headerRight: <Button onPress={() => _this.sendInterestArray()} title={navigation.state.params.headerRightText} /> //來自下方的 initialRouteParams
    };
   };



   componentDidMount(){
     _this = this;  //把 this指給 navigationOptions調用
   }


   addInterestArray(idx){

     let newArray = this.state.chooseArray;


      if(newArray.length > 0){  //過濾掉重複選取同一個興趣
          for(let i=0 ; i < newArray.length ; i++){
            if(newArray[i].name == BasketballTeam[idx].name){ //如果點選的物件已經在選取Array裡面,要把它拿掉喔
                newArray.splice(i,1);
                this.setState({chooseArray:newArray});
                this.changeHeaderRightText();//更換右上角文字
                return;
            }
          }
      }

     if(newArray.length >=3){
       alert('不能選取超過三個');
       return;
     }

     newArray.push(BasketballTeam[idx]);
     this.setState({chooseArray:newArray})
     this.changeHeaderRightText();//更換右上角文字
   }



   changeHeaderRightText(){ //如有選擇東西 把"略過" 改成 "確認", 如果都沒選擇改回原本的 "略過"


     if(this.state.chooseArray.length == 0){
        const setParamsAction  = this.props.navigation.setParams({ headerRightText:'略過'})
        this.props.navigation.dispatch(setParamsAction)
     }else{
       const setParamsAction  = this.props.navigation.setParams({ headerRightText:'確定'})
       this.props.navigation.dispatch(setParamsAction)
     }

   }




  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Button title="Go to tabtest" onPress={() => this.props.navigation.navigate('Tabtest')}  />

        {BasketballTeam.map(function(item,index){ //房間的array做map渲染

           return(
            <Button key={index} onPress={() => this.addInterestArray(index)} title={item.name}/>
           );
        }.bind(this))}

        {this.state.chooseArray.map(function(item,index){ //房間的array做map渲染

           return(
             <Text key={index}>{item.name}</Text>
           );
        }.bind(this))}

      </View>
    );
  }
}







let RootStack = createStackNavigator(
  {
    Home: {
        screen: First,
    },
    Tabtest: {
        screen: Tabtest,
    },

 },
  {
    initialRouteName: 'Home',
    initialRouteParams: {headerRightText: '略過'},
    /* The header config from HomeScreen is now here */
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
