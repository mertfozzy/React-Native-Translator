import React from 'react';
import { Button, Text } from 'react-native';
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
    }).then(function(response){
      console.log(JSON.stringify(response.data, null, 4));
      setResponse(JSON.stringify(response.data, null, 4));
    })



  };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text> EN - TR </Text>
            <TextInput
              numberOfLines={5}
              multiline={true}
              style={{ height: 120, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setText(text)}
            />
            <Button
              title='Translate'
              color='#ff6600'
              onPress={() => postTranslateService(inputText)}
            />
            <Text
              style={{ height: 120, borderColor: 'gray', borderWidth: 1 }}
            >{'Response: ' + responseText}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );

};

export default App;