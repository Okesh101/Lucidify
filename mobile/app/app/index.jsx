import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Input from "../components/input";
import Button from "../components/button";
import { act, useState } from "react";

const HomeLayout = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("login");
  return (
    <SafeAreaView style={styles.Container}>
      <View style={{ gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 80,
          }}
        >
          <View>
            <Image
              style={{ width: 50, height: 50, marginRight: 10 }}
              source={require("../assets/images/insurance.png")}
            />
          </View>

          <View style={styles.safeView}>
            <Text
              style={{
                color: "#0000",
                justifyContent: "center",
                fontFamily: "bold",
                fontSize: 18,
              }}
            >
              SME Compliance
            </Text>
            <Text style={{ fontFamily: "SemiBold", color: "#145C2F" }}>
              Fast-Track
            </Text>
          </View>
        </View>

        <Text
          style={{
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "medium",
          }}
        >
          One form. Four minutes. Zero lawyers
        </Text>
      </View>

      <View style={styles.centerView}>
        <View style={styles.tabsRow}>
          <TouchableOpacity
          // conditionally rendered the style based on the current tab
            style={
              activeTab === "login" ? styles.activeTab : styles.inactiveTab
            }
            // Function to set the active tab to be login when clicked on it 
            onPress={() => setActiveTab("login")}
          >
            {/* Conditionally rendered the text style  */}
            <Text
              style={
                activeTab === "login"
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
           // conditionally rendered the style based on the current tab
            style={
              activeTab === "signup" ? styles.activeTab : styles.inactiveTab
            }
              // Function to set the active tab to be signup when clicked on it 
            onPress={() => setActiveTab("signup")}
          >
            {/* Conditionally rendered the text style  */}
            <Text
              style={
                activeTab === "signup"
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.welcomeText}>
          {/* Conditionally rendered the text content based on the tab  */}
          {activeTab === "login" ? "Welcome back" : "Welcome"}
        </Text>
        <Text
          style={{ fontSize: 13, marginVertical: 10, fontFamily: "regular" }}
        >
          {/* Conditionally rendered the text content based on the tab  */}
          {activeTab === "login"
            ? "Login to continue filing your CAC Annual Return"
            : "Signup to start filing your CAC Annual Return"}
        </Text>
        {/* Conditional statement that shows when the activeTab is signup only */}
        {activeTab === "signup" && (
          <>
            <Text style={{ marginVertical: 10, fontFamily: "medium" }}>
              First Name
            </Text>
            <Input title="John" />

            <Text style={{ marginVertical: 10, fontFamily: "medium" }}>
              Last Name
            </Text>
            <Input title="Doe" />
          </>
        )}

        <Text style={{ marginVertical: 10, fontFamily: "medium" }}>Email</Text>
        <Input title="JohnDoe@gmail.com" />

        <Text
          style={{ marginVertical: 10, marginTop: 20, fontFamily: "medium" }}
        >
          Password
        </Text>
        <Input title="********" security={true} />

        <Text
          style={{
            textAlign: "right",
            marginTop: 15,
            fontFamily: "regular",
            color: "#22A84A",
            fontSize: 12,
          }}
        >
          Forgot Password?
        </Text>

        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 30 }}
        >
          <Text style={{ fontFamily: "light", fontSize: 13 }}>
            {/* Conditionally rendered the text content based on the tab  */}
            {activeTab === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Text>

          {/* Conditionally rendered the button text content based on the tab  */}
          {activeTab === "login" ? (
            <Text
              style={{ color: "#22A84A", fontFamily: "regular", fontSize: 13 }}
              onPress={() => setActiveTab("signup")}
            >
              {" "}
              Create one
            </Text>
          ) : (
            <Text
              style={{ color: "#22A84A", fontFamily: "regular", fontSize: 13 }}
              onPress={() => setActiveTab("login")}
            >
              {" "}
              Login
            </Text>
          )}
        </View>

          {/* Conditionally rendered the text content based on the tab  */}
        <Button title={activeTab === 'login' ? "Login" : "Sign Up"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#E8F5EE",
  },

  safeView: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },

  centerView: {
    width: "90%",
    // height: 500,
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Semi-transparent white

    // 1. Edges
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)", // Soft white border

    // 2. Shadows for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,

    // 3. Shadows for Android
    elevation: 10,

    padding: 20,
  },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#D4EDE0", // muted green tab container
    borderRadius: 12,
    padding: 1,
    marginBottom: 24,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#22A84A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  inactiveTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },

  activeTabText: {
    color: "#22A84A",
    fontFamily: "SemiBold",
    fontSize: 14,
    width: 100,
    textAlign: "center",
  },

  inactiveTabText: {
    color: "#6B9E7E",
    fontSize: 14,
    fontFamily: "medium",
    width: 100,
    textAlign: "center",
  },

  welcomeText: {
    fontSize: 24,
    fontFamily: "SemiBold",
    color: "#1E5C38",
  },
});

export default HomeLayout;
