import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

const image = { uri: "https://media-cdn.tripadvisor.com/media/photo-s/0f/e9/72/f4/buyuk-camlica-tepesi.jpg" };
const url = 'https://api.openweathermap.org/data/2.5/'
const key = 'e66680bcee745a2dbd15ace4cbe2cecb'

export default function App () {

  const [inputValue , setInputValue] = useState('');
  const [temp , setTemp] = useState('');
  const [min , setMin] = useState('');
  const [max , setMax] = useState('');
  const [status , setStatus] = useState('');

  const handleInputValue = (text) => {
    setInputValue(text)
  }
  
  const handleSubmitEdit = () => {
    console.log('Değer : ' + inputValue)
  }
  
  async function fetchData() {
    try {
      let query = `${url}weather?q=${inputValue}&appid=${key}&units=metric&lang=tr`;
      const response = await fetch(query);
      const data = await response.json();
      setTemp(Math.floor(data.main.temp))
      setMin(Math.floor(data.main.temp_min))
      setMax(Math.floor(data.main.temp_max))
      setStatus(data.weather[0].description)
      console.log(data);
      
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();

return(
  <View style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
      <Text style={styles.text}>Weather API</Text>
      <TextInput style={styles.textinputs} value={inputValue} onChangeText={handleInputValue} onSubmitEditing={handleSubmitEdit} />
      <Text style={styles.text}>{inputValue} , TR</Text>
      <Text style={styles.textmin}>Sıcaklık</Text>
      <Text style={styles.text}>{temp}</Text>
      <Text style={styles.textmin}>Durum</Text>
      <Text style={styles.text}>{status}</Text>
      <Text style={styles.textmin}>Min - Max</Text>
      <Text style={styles.text}>{min} - {max}</Text>
    </ImageBackground>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: '#FE7A36',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
    
  },
  textmin: {
    color: '#E9F6FF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
    
  },
  textinputs : {
    borderColor : '#FE7A36',
    borderRadius : 10,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
  }
});
