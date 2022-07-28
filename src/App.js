import React from 'react';
import { Button, Pressable, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { StyleSheet, SafeAreaView } from 'react-native';
import Tts from 'react-native-tts';

const axios = require('axios').default;
const { useState, Fragment } = require("react");
const { StatusBar, ScrollView, View, TextInput } = require("react-native");
const { v4: uuidv4 } = require('uuid');



const App = () => {

  const [inputText, setText] = useState('');
  const [responseText, setResponse] = useState('');
  const [detectLanguage, setLanguage] = useState('');

  const handleVoice = () => {
    console.log("buraya geldi.")
    Tts.speak("If you like this video.");
  }

  let key = "6dc546ea8df4448d87b5a2593bed48be";
  let endpoint = "https://api.cognitive.microsofttranslator.com";
  let location = "eastus";


  postTranslateService();

  function postTranslateService(text) {

    axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
      },
      params: {
        'api-version': '3.0',
        'to': ['tr']
      },
      data: [{
        'text': text
      }],
      responseType: 'json'
    }).then(function (response) {
      //console.log(JSON.stringify(response.data, null, 4));
      console.log(JSON.stringify(response.data[0].detectedLanguage.language, null, 4));
      setLanguage(JSON.stringify(response.data[0].detectedLanguage.language, null, 4));
      setResponse(JSON.stringify(response.data[0].translations[0].text, null, 4));
    })



  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>- Otomatik Dil Algılama -</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Type something to translate."
            multiline={true}
            onChangeText={text => setText(text)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          title='Translate'
          color='#04aeec'
          style={styles.buttonStyle}
          onPress={() => postTranslateService(inputText)}
        >
          <Text style={styles.btnText}>Translate</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <View style={styles.outputView}>
          <Text
            placeholder="Translation will be here."
            style={styles.output}
          >
            {responseText}
          </Text>
        </View>
        <Text style={styles.detected}>Algılanan Dil : {detectLanguage}</Text>
        <View style={styles.line}></View>

        <TouchableHighlight 
        style={styles.voiceButton} 
        onPress={() => handleVoice()}>
      
          <Text style={styles.btnText}>Hello world</Text>
      
        </TouchableHighlight>
      
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: "100%",
    flex: 1,
    margin: 15,
    backgroundColor: "transparent",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flex: 0,
    flexDirection: "row",
    fontSize: 15
  },
  detected: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flex: 0,
    flexDirection: "row",
    fontSize: 18,
    fontWeight: 'bold'
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    opacity: 0.1,
    marginTop: 10,
  },
  inputView: {
    flex: 0,
    flexDirection: "row",
  },
  input: {
    fontSize: 24,
    paddingBottom: 48,
    width: "90%",
  },
  outputView: {
    flex: 0,
    flexDirection: "row",
    marginTop: 20,
  },
  output: {
    fontSize: 24,
    paddingBottom: 48,
    marginLeft: 4,
    marginRight: -4,
    width: "90%",
    color: "#1377b3"
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#04aeec',
    borderRadius: 20
  },
  btnText: {
    color: "white",
    fontSize: 20,
    padding: 3
  },
  voiceButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#04aeec',
    borderRadius: 20
  }

});



export default App;