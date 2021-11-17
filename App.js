import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button, FlatList,Text, TouchableOpacity, Alert } from 'react-native';
import Header from './Components/Header';
import Todos from './Components/Todos';
import Icon from 'react-native-vector-icons/Fontisto';
import axios from 'axios';


export default function App() {
  const [newTodo, setNewTodo] = useState("");

  const onchange = (textValue) => setNewTodo(textValue);
  const addTodo = (newTodo) => {
    try {
      const todoAdd = newTodo;
      if (todoAdd == "") {
        Alert.alert("Empty input", "It seems to us that you tried inputing empty field, please fill it");
        return;
      }
      axios.post('http://192.168.1.9:3001/todos', {todoText: todoAdd}).then((response) => {
        console.log(response);
        setNewTodo('');
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Header/>
      <TextInput style={styles.input} placeholder="Add new todo..." onChangeText={onchange} value={newTodo}></TextInput>
      <View style={styles.addTodo}>
        <TouchableOpacity style={styles.btn} onPress={() => addTodo(newTodo)}>
          <Text style={styles.btntext}>
            <Icon style={styles.icon} name="plus-a" size={20} color="firebrick">
              Add new
            </Icon>
          </Text>
        </TouchableOpacity>        
      </View>
      <Todos></Todos>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    paddingTop: 25
  },
  input: {
    height: 60,
    padding:8,
    fontSize:16,
    borderTopWidth: 2,
    borderTopColor: "#fff",
    backgroundColor: '#fff',
    marginTop: 5
  },
  btn: {
    backgroundColor: '#c0c0c0',
    padding:9,
    margin: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginBottom: 2
  },
  btntext: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
    
  },
  icon: {
    paddingLeft: 10
  }
  
});
