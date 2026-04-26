import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title = "", onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
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
    textTransfor: "lowercase",
  },
});

export default Button;
