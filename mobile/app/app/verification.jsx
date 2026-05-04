import React from 'react'
import { CurrentTabNNumber } from '../components/currentTabNUmber'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VerifyTextList from '../components/verifyTextList';
import { router } from 'expo-router';

const Verification = () => {
  return (
    <SafeAreaView>

      <View>
        <CurrentTabNNumber />
      </View>

      <Text style={styles.verifyText}>Let's verify your company</Text>
      <Text style={styles.verifySubText}>We found this company with RC number </Text>
      <View>
        <VerifyTextList text1="Company Name" text2="Your Company Name" />
        <VerifyTextList text1="BN Number" text2="Your BN Number" />
        <VerifyTextList text1="Company Type" text2="Your Company Type" />
        <VerifyTextList text1="Registration Date" text2="Date Of Registration" />
        <VerifyTextList text1="Status" text2="Active" />
        <VerifyTextList text1="Registration Address" text2="Your Registration Address" />

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 25, gap: 20 }} >
          <TouchableOpacity style={styles.verifyButton1}>
            <Text
              onPress={() => router.back("/dashboard")}
              style={{
                justifyContent: "center",
                textAlign: "center",
                borderRadius: 10,
                paddingVertical: 10,
                fontFamily: "regular",
              }}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.verifyButton2}>
            <Text
              onPress={() => router.push("/questions")}
              style={{
                justifyContent: "center",
                textAlign: "center",
                borderRadius: 10,
                paddingVertical: 10,
                color: "#FFF",
                fontFamily: "regular",
              }}
            >Continue</Text>
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 30 }}>
          <Text style={{ fontFamily: "regular", fontSize: 13, }}>Can't find your company? </Text>
          <Text style={{ color: "#1dbb4cff", fontFamily: "medium", fontSize: 13 }}>Check your BN Number.</Text>
        </View>
      </View>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  verifyText: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 30,
    fontFamily: "bold",
    fontSize: 20,


  },

  verifySubText: {
    justifyContent: "center",
    textAlign: "center",
    color: "#000",
    marginTop: 5,
    opacity: 0.5,

  },

  verifyButton1: {
    backgroundColor: "#FFF",
    marginLeft: 20,
    height: 45,
    width: 150,
    borderRadius: 5,
  },

  verifyButton2: {
    backgroundColor: "#22A84A",
    height: 45,
    width: 150,
    marginRight: 50,
    borderRadius: 5,
  },
})


export default Verification;