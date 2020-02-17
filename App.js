import React from "react";
import {Alert} from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "114de491b53c613d00593519046e35ec";

export default class extends React.Component {
  state ={
    isLoading : true
  };
  
  getWeather = async (latitude, longitube) =>{ // 변수에 담아뒀단 위도,경도와 API_KEY 설정/ celcius(섭씨)로 보여주는 설정
    const { data } = await axios.get( //API키 
      `api.openweathermap.org/data/2.5/weather?lat= ${latitude} & lon = ${longitube} & appid = ${API_KEY} &units=metric`);
      //console.log(data);
      this.setState({isLoading:false , temp : data.main.temp});
  }

  getLocation = async() => {
    try{
     await Location.requestPermissionsAsync();  //위치정보를 불러오는것을 승인 묻기
     const { coords : { latitude, longitube} } = await Location.getCurrentPositionAsync(); //위치정보 불러오기
     this.getWeather(latitude, longitube); // getWeather 함수 호출
     
    }catch (error){
      Alert.alert("Can't find you.","사용자의 위치를 찾을 수 없습니다.");
    }
  };

  componentDidMount(){
    this.getLocation();
  }
  render(){
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading/> : <Weather temp={temp}/>;  // isLoading이 있으면 <Loading>을 return하고 아니면 Weather(temp)를 리턴
    }
}


