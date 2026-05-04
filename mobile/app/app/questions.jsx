import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CurrentTabNNumber } from "../components/currentTabNUmber";
import { router } from "expo-router";
import { useState } from "react";


const QuestionPage = () => {

    const [bnNumber, setBnNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [natureBusiness, setNatureBusiness] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [hasProprietors, setHasProprietors] = useState(null);
    const [changes, setchanges] = useState(null);

    const [activeTab, setActiveTab] = useState("Business")

    const RadioGroup = ({ label, value, onChange }) => (
        <View style={styles.radioGroup}>
            <Text style={styles.radioLabel}>{label}</Text>
            <View style={styles.radioRow}>
                <TouchableOpacity style={styles.radioOption} onPress={() => onChange("yes")}>
                    <View style={styles.radioCircle}>
                        {value === "yes" && <View style={styles.radioFilled} />}
                    </View>
                    <Text style={styles.radioText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioOption} onPress={() => onChange("no")}>
                    <View style={styles.radioCircle}>
                        {value === "no" && <View style={styles.radioFilled} />}
                    </View>
                    <Text style={styles.radioText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.Container}>

                    <View>
                        <CurrentTabNNumber />
                    </View>

                    <Text style={styles.verifyText}>Tell us about your company</Text>
                    <Text style={styles.verifySubText}>We found this company with RC number </Text>
                    <Text style={styles.selectText}>Select Your Business Type</Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 25, gap: 20 }}>
                        <TouchableOpacity
                            style={activeTab === "Business" ? styles.verifyButton1 : styles.verifyButton2}
                            onPress={() => setActiveTab("Business")}   // ← sets active tab
                        >
                            <Text style={{
                                color: activeTab === "Private" ? "#000" : "#FFF",
                                fontFamily: "medium"

                            }}>Business</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={activeTab === "Private" ? styles.verifyButton1 : styles.verifyButton2}
                            onPress={() => setActiveTab("Private")}
                        >
                            <Text style={{
                                color: activeTab === "Private" ? "#FFF" : "#000",
                                fontFamily: "medium",
                                textAlign: "center",
                            }}>
                                Private Company Limited
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* ── FORM BELOW LINE 52 ── */}
                    {/* Form area — swaps based on active tab */}
                    <View style={styles.form}>

                        {activeTab === "Business" ? (
                            // ── BUSINESS FORM (your existing fields) ──
                            <>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>BN Number</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter BN Number"
                                        placeholderTextColor="#aaa"
                                        value={bnNumber}
                                        onChangeText={setBnNumber}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Full Name of Proprietor</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter full name"
                                        placeholderTextColor="#aaa"
                                        value={fullName}
                                        onChangeText={setFullName}
                                    />
                                </View>

                                {/* ...rest of your existing Business fields... */}

                                <RadioGroup
                                    label="Has the proprietor's residential address changed since last filing?"
                                    value={hasProprietors}
                                    onChange={setHasProprietors}
                                />
                                <RadioGroup
                                    label="Have you made any other changes to business particulars with CAC this year?"
                                    value={changes}
                                    onChange={setchanges}
                                />
                            </>
                        ) : (
                            // ── PRIVATE COMPANY FORM (new fields) ──
                            <>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>RC Number</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter RC Number"
                                        placeholderTextColor="#aaa"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Company Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter company name"
                                        placeholderTextColor="#aaa"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Nature of Business</Text>
                                    <TextInput
                                        style={[styles.input, styles.textArea]}
                                        placeholder="Describe the nature of your business..."
                                        placeholderTextColor="#aaa"
                                        multiline={true}
                                        numberOfLines={4}
                                        textAlignVertical="top"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Registered Address</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter registered address"
                                        placeholderTextColor="#aaa"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Company Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter company email"
                                        placeholderTextColor="#aaa"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Number of Directors</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. 2"
                                        placeholderTextColor="#aaa"
                                        keyboardType="numeric"
                                    />
                                </View>
                            </>
                        )}

                        {/* Continue button — shown for both tabs */}
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => router.push("/next-step")}
                        >
                            <Text style={styles.submitText}>Continue</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    scrollContent: {
        paddingBottom: 40,
    },

    Container: {
        paddingHorizontal: 20,
        // paddingTop: 10,
    },

    verifyText: {
        textAlign: "center",
        marginTop: 20,
        fontFamily: "bold",
        fontSize: 20,
        color: "#111",
    },

    verifySubText: {
        textAlign: "center",
        color: "#000",
        marginTop: 5,
        opacity: 0.5,
        fontFamily: "regular",
    },

    selectText: {
        textAlign: "center",
        marginTop: 40,
        fontFamily: "bold",
        color: "#111",
    },

    verifyButton1: {
        backgroundColor: "#22A84A",
        width: 150,
        height: 45,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",

    },

    verifyButton1Text: {
        color: "#FFF",
        fontFamily: "regular"
    },

    verifyButton2Text: {

    },

    verifyButton2: {
        backgroundColor: "#FFF",
        width: 150,
        height: 45,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DDE1E7",
    },

    // ── Form ──
    form: {
        marginTop: 30,
    },

    inputGroup: {
        marginBottom: 16,
    },

    label: {
        fontFamily: "bold",
        fontSize: 13,
        color: "#333",
        marginBottom: 6,
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#DDE1E7",
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: "#FFF",
        fontFamily: "regular",
        fontSize: 14,
        color: "#111",
    },

    textArea: {
        height: 110,
        paddingTop: 12,
        paddingBottom: 12,
    },

    // ── Radio Buttons ──
    radioGroup: {
        marginBottom: 20,
    },

    radioLabel: {
        fontFamily: "bold",
        fontSize: 13,
        color: "#333",
        marginBottom: 10,
    },

    radioRow: {
        flexDirection: "row",
        gap: 24,
    },

    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#22A84A",
        alignItems: "center",
        justifyContent: "center",
    },

    radioFilled: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#22A84A",
    },

    radioText: {
        fontFamily: "regular",
        fontSize: 14,
        color: "#333",
    },

    // ── Submit ──
    submitButton: {
        backgroundColor: "#22A84A",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    submitText: {
        color: "#FFF",
        fontFamily: "bold",
        fontSize: 16,
    },
});

export default QuestionPage;