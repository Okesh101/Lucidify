import { TextInput, StyleSheet} from "react-native";



const Input = ({title, type, value,onChangeText, security}) => {
    return(
        
        <TextInput secureTextEntry={security} keyboardType={type} placeholder={title} placeholderTextColor="#0000006d" value={value} onChangeText={onChangeText} style={styles.TextInput}></TextInput>
    )
}



export default Input; 

const styles = StyleSheet.create({
    TextInput : {
        borderRadius: 10,
        borderColor:"#000000a0", 
        borderWidth: 0.5, 
        paddingHorizontal : 10,

        
    }
})