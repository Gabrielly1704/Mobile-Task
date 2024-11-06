import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Feather} from "@expo/vector-icons"
import { TaskDTO } from "../dto/task";

type TaskProps = TaskDTO &{
  handleDelete: (task: TaskDTO) => void
  handleDone: (task: TaskDTO) => void
}

export function Task({task, done, handleDelete, handleDone}: TaskProps){
  return(
    <View style={styles.container}>
      <Text style={[styles.title, {textDecorationLine: done? "line-through" : "none"}]}>{task}</Text>
      <TouchableOpacity style={styles.button} onPress={()=> handleDone({} as TaskDTO)}>
        <Feather name="check" size={28}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=> handleDelete({} as TaskDTO)}>
        <Feather name="delete" size={28}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10
  },
  title:{
    flex: 1,
  },
  button:{
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 6,
    padding: 5
  }
})
