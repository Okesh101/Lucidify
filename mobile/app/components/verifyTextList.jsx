import { View, Text, StyleSheet } from "react-native"




const VerifyTextList = ({ text1, text2 }) => {
    return (
        <View style={styles.View}>
            <Text style={styles.text1}>{text1}</Text>
            <Text style={styles.text2}>{text2}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    View: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
        marginTop: 40,
        paddingHorizontal: 26,

    },

    text1: {
        color: "#000",
        textAlign: "left",
        fontFamily: "medium",
        flex: 1,
    },

    text2: {
        color: "#000",
        textAlign: "right",
        fontFamily: "medium",
        flex: 1,               // 👈 takes up its own space
        flexWrap: "wrap",
    }
})

export default VerifyTextList;