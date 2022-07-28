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
  const [shouldShow, setShouldShow] = useState('');

  const handleVoice = () => {
    Tts.speak(inputText);
  }

  let key = "6dc546ea8df4448d87b5a2593bed48be";
  let endpoint = "https://api.cognitive.microsofttranslator.com";
  let location = "eastus";


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

    setShouldShow(!shouldShow);

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
        //onPress={() => }
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



        <View>
          {
            shouldShow ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.detected}> --&gt; Algılanan Dil :
                </Text>
                <TouchableHighlight
                  style={styles.voiceButton}
                  onPress={() => handleVoice()}>
                  <Text style={styles.voiceBtnText}>{detectLanguage}</Text>
                </TouchableHighlight>
              </View>
            ) : null
          }
        </View>


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
  detected: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    fontSize: 18,
    fontWeight: 'bold'
  },
  btnText: {
    color: "white",
    fontSize: 20,
    padding: 3
  },
  voiceBtnText: {
    color: "white",
    fontSize: 18,
  },
  voiceButton: {
    backgroundColor: '#04aeec',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    padding: 4,
    width: "100%"
  }

});



export default App;