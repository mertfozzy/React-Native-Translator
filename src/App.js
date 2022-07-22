import React from 'react';
import { Button, Text } from 'react-native';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useEffect } from 'react';
const axios = require('axios').default;
const { useState, Fragment } = require("react");
const { StatusBar, ScrollView, View, TextInput } = require("react-native");




const App = () => {

  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [options, setOptions] = useState('');
  const [inputText, setText] = useState('');
  const [responseText, setResponse] = useState('');

  console.log("mert");
  postTranslateService();

  function postTranslateService(text) {

    useEffect(()=>{
      axios.get('https://libretranslate.com/languages',
      {headers:{'accept':'application/json'}})
      .then(res=>{
        console.log(res.data);
        setOptions(res.data);
      })
    })
  
    //curl - X GET "https://libretranslate.com/languages" - H  "accept: application/json"



/*     fetch('https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20200418T170345Z.bc1a7bbbbe797646.b3a4b85d9ec55c9b821be6462380cde319272af8&text=' + text) //api url
      .then((res) => res.json())
      .then((res) => {
        console.log(res.text)
        setResponse(res.text)
      })
      .catch((error) => {
        console.log(error)
      }); */

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