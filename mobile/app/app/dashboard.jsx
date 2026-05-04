import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from "../components/input";
import Button from "../components/button";
import { router } from "expo-router";



const DashBoard = () => {
    const [rcNumber, setRcNumber] = useState("");

    return (
        <SafeAreaView style={{ gap: 40 }}>
            <ScrollView>
                {/* The header View or Navs */}
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Image
                            style={{ width: 40, height: 40, marginRight: 10 }}
                            source={require("../assets/images/insurance.png")}
                        />
                        <Text style={{ alignSelf: "center", fontFamily: "bold", fontSize: 15 }}>CAC FastTrack</Text>
                    </View>

                    <TouchableOpacity>
                        <View style={{ opacity: 1 }}>
                            <Ionicons name="reorder-three" size={26} color="#000000" />
                        </View>
                    </TouchableOpacity>

                </View>

                <Text
                    style={{ marginTop: 30, fontSize: 35, textAlign: "left", fontFamily: "bold", marginLeft: 20, marginRight: 70 }}
                >File Your CAC Annual Return in 4 Minutes</Text>

                <Text
                    style={{ marginHorizontal: 20, marginTop: 5, marginBottom: 20, fontFamily: "regular" }}
                >Stop struggling with BN/O6 forms. Our AI extracts your data, validates it, and generates your return — 100% compliant.
                </Text>

                <View style={styles.tabsRow}>
                    <TouchableOpacity >
                        <Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text></Text>
                    </TouchableOpacity>
                </View>

                <Input
                    title=" Enter your RC Number or BN "
                    type="numeric"
                    value={rcNumber}
                    onChangeText={setRcNumber}
                    style={{ marginHorizontal: 40, marginTop: -10 }}
                />

                <Button onPress={() => router.push("verification")} title="Get Started " style={{ width: "78%", backgroundColor: "#22A84A", }} />


                {/* Feature Icons */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginVertical: 55 }}>

                    {/* AI Powered Icon */}
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Image style={{ width: 40, height: 40, tintColor: "#1A73E8" }} source={require("../assets/images/ai.png")} />
                        <Text style={{ fontFamily: "medium", textAlign: "center", fontSize: 11, marginTop: 5 }}>AI Powered Extraction</Text>
                    </View>

                    {/* 100% Compliant Icon */}
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Image style={{ width: 40, height: 40, }} source={require("../assets/images/policy.png")} />
                        <Text style={{ fontFamily: "medium", textAlign: "center", fontSize: 11, marginTop: 5 }}>100% Compliant</Text>
                    </View>

                    {/* Download File Icon */}
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Image style={{ width: 40, height: 40, tintColor: "#1A73E8" }} source={require("../assets/images/icons8padlock.png")} />
                        <Text style={{ fontFamily: "medium", textAlign: "center", fontSize: 11, marginTop: 5 }}>Download & File</Text>
                    </View>

                </View>




                <View style={styles.footer}>
                    <Text style={styles.footerText}>Trusted by 1,000+ Nigerian Businesses</Text>
                    <Text style={styles.footerSubText}>Fast, accurate, compliant</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 9,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    },

    logo: {
        flexDirection: "row"
    },

    footer: {
        backgroundColor: "#1A3C2E",   // dark green from prototype
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",          // centers everything horizontally
        marginop: 60,
        height: 150,

    },

    footerText: {
        color: "#FFFFFF",
        fontFamily: "bold",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5,
        fontFamily: "Extra_bold"
    },

    footerSubText: {
        color: "#FFFFFF",
        fontFamily: "regular",
        fontSize: 13,
        textAlign: "center",
        marginBottom: 15,
    },



});

export default DashBoard;