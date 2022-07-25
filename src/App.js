import React from 'react';
import { Button, Pressable, Text } from 'react-native';
import { StyleSheet, SafeAreaView } from 'react-native';

const axios = require('axios').default;
const { useState, Fragment } = require("react");
const { StatusBar, ScrollView, View, TextInput } = require("react-native");
const { v4: uuidv4 } = require('uuid');



const App = () => {

  const [inputText, setText] = useState('');
  const [responseText, setResponse] = useState('');

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
        'from': 'en',
        'to': ['tr']
      },
      data: [{
        'text': text
      }],
      responseType: 'json'
    }).then(function (response) {
      //console.log(JSON.stringify(response.data, null, 4));
      console.log(JSON.stringify(response.data[0].translations[0].text, null, 4));
      setResponse(JSON.stringify(response.data[0].translations[0].text, null, 4));
    })



  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text> EN - TR </Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Type something to translate."
            multiline={true}
            onChangeText={text => setText(text)}
            style={styles.input}
          />
        </View>
        <Button
          title='Translate'
          color='#04aeec'
          style={styles.buttonStyle}
          onPress={() => postTranslateService(inputText)}
        />
        <View style={styles.line}></View>
        <View style={styles.outputView}>
          <Text
            placeholder="Translation will be here."
            style={styles.output}
          >
            {responseText}
          </Text>
        </View>


      </ScrollView>

    </View>
  );





};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    margin: 15,
    backgroundColor: "transparent",
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
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#04aeec'
  }

});



export default App;