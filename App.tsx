import { Alert, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { TaskDTO } from './src/dto/task';
import {Task} from "./src/components/task"
import { useState } from 'react';
import {Feather} from "@expo/vector-icons"

export default function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<TaskDTO[]>([])

  function handleInsert(){
    if(task){
      setTasks([...tasks, {
        id: Math.random(),
        task,
        done: false
      }])
      setTask("")
    }else{
      Alert.alert("Atenção", "Campo obrigatório!")
    }
  }
  function handleDelete(item: TaskDTO){
    const tasksFiltered = tasks.filter(task => task.id!== item.id)
    setTasks(tasksFiltered)
    Alert.alert("Task deletada com sucesso!")
  }
  function handleDone(item: TaskDTO){
    const index = tasks.indexOf(item)
    tasks[index].done = !tasks[index].done
    Alert.alert("Marcada como concluida!")
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <TextInput
        value={task}
        onChangeText={setTask}
        style={styles.input}
        placeholder='Digite a Task....'
        />
        <TouchableOpacity style={styles.buton} onPress={handleInsert}>
          <Feather name='plus' size={28}/>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
        <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{
          gap: 10
        }}
        renderItem={({item})=> (
          <Task
          task={item.task}
          done={item.done}
          handleDone={()=> handleDone(item)}
          handleDelete={()=> handleDelete(item)}
          />
        )}
        />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  inputContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 6,
    marginTop: 50
  },
  input:{
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: 10,
    flex: 1,
    borderRadius:5,
  },
  buton:{
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 6,
    padding: 5
  }
});
