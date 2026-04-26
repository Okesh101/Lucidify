import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

const Button = ({ title = "", onPress, style, image }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText]}>{title}</Text>
       {image && <Image source={image} style={styles.image} />}
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#22A84A",
    height: 40,
    borderRadius: 10,
    paddingVertical: 10,
    width: 150,
    alignSelf: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily:'regular',
  },

  image : {

  }
});

export default Button;
