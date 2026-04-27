import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Input from "../components/input";
import Button from "../components/button";

const DashBoard = () => {
  const [rcNumber, setRcNumber] = useState("");
  const [bnNumber, setBnNumber] = useState("");
  const [selectedTab, setSelectedTab] = useState(null); // 'rc' or 'bn'

  const handleActiveTab = (tab) => {
    setSelectedTab(tab)
    if(tab === 'bn'){
        setRcNumber("")
    } else {
        setBnNumber("")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, width: "100%" }}>
        {/* The header View or Navs */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image
              style={{ width: 40, height: 40, marginRight: 10 }}
              source={require("../assets/images/insurance.png")}
            />
            <Text
              style={{ alignSelf: "center", fontFamily: "bold", fontSize: 15 }}
            >
              CAC FastTrack
            </Text>
          </View>

          <TouchableOpacity>
            <View style={{ opacity: 1 }}>
              <Ionicons name="reorder-three" size={26} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            marginTop: 35,
            fontSize: 45,
            textAlign: "left",
            fontFamily: "bold",
            marginLeft: 20,
            marginRight: 70,
          }}
        >
          File Your CAC Annual Return in 4 Minutes
        </Text>

        <Text
          style={{
            marginHorizontal: 20,
            marginTop: 5,
            fontFamily: "semibold",
            fontSize: 20,
            lineHeight: 30,
          }}
        >
          Stop struggling with BN/O6 forms. Our AI extracts your data, validates
          it, and generates your return — 100% compliant.
        </Text>

        <View style={{ marginVertical: 20 }}>
          {/* Default Instruction Text */}
          {!selectedTab && (
            <Text
              style={{
                marginHorizontal: 20,
                fontFamily: "medium",
                fontSize: 14,
                color: "#666666",
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Select the option that matches your business type to get started
            </Text>
          )}

          {/* RC Number and BN Number Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "rc" && styles.tabButtonActive,
                selectedTab !== "rc" && styles.tabButtonInactive,
              ]}
              onPress={() => handleActiveTab("rc")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "rc" && styles.tabTextActive,
                ]}
              >
                RC Number
              </Text>
              <Text
                style={[
                  styles.tabSubText,
                  selectedTab === "rc" && styles.tabSubTextActive,
                ]}
              >
                For Registered Companies
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "bn" && styles.tabButtonActive,
                selectedTab !== "bn" && styles.tabButtonInactive,
              ]}
              onPress={() => handleActiveTab("bn")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "bn" && styles.tabTextActive,
                ]}
              >
                BN Number
              </Text>
              <Text
                style={[
                  styles.tabSubText,
                  selectedTab === "bn" && styles.tabSubTextActive,
                ]}
              >
                For Mini Businesses
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditional Input Fields */}
          {selectedTab === "rc" && (
            <Input
              title="Enter your RC Number"
              type="text"
              value={rcNumber}
              onChangeText={setRcNumber}
              style={{ marginHorizontal: 20, marginTop: 25 }}
            />
          )}

          {selectedTab === "bn" && (
            <Input
              title="Enter your BN Number"
              type="text"
              value={bnNumber}
              onChangeText={setBnNumber}
              style={{ marginHorizontal: 20, marginTop: 25 }}
            />
          )}

          {selectedTab && (
            <View style={{ marginHorizontal: 20, marginTop: 8 }}>
              <Button
                title="Get Started"
                style={{ width: "100%", backgroundColor: "#22A84A" }}
              />
            </View>
          )}
        </View>

        {/* Feature Icons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
            marginTop: 30,
          }}
        >
          {/* AI Powered Icon */}
          <View style={{ alignItems: "center", flex: 1 }}>
            <Image
              style={{ width: 50, height: 50, tintColor: "#1A73E8" }}
              source={require("../assets/images/ai.png")}
            />
            <Text
              style={{
                fontFamily: "medium",
                textAlign: "center",
                fontSize: 11,
                marginTop: 5,
              }}
            >
              AI Powered Extraction
            </Text>
          </View>

          {/* 100% Compliant Icon */}
          <View style={{ alignItems: "center", flex: 1 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../assets/images/policy.png")}
            />
            <Text
              style={{
                fontFamily: "medium",
                textAlign: "center",
                fontSize: 11,
                marginTop: 5,
              }}
            >
              100% Compliant
            </Text>
          </View>

          {/* Download File Icon */}
          <View style={{ alignItems: "center", flex: 1 }}>
            <Image
              style={{ width: 50, height: 50, tintColor: "#1A73E8" }}
              source={require("../assets/images/icons8padlock.png")}
            />
            <Text
              style={{
                fontFamily: "medium",
                textAlign: "center",
                fontSize: 11,
                marginTop: 5,
              }}
            >
              Download & File
            </Text>
          </View>
        </View>
      </View>

      {/* Footer - Positioned at the Bottom */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Trusted by 1,000+ Nigerian Businesses
        </Text>
        <Text style={styles.footerSubText}>
          Fast processing, accurate data validation, and fully CAC-compliant
          filings - helping you complete your annual return without stress of
          costly mistakes.
        </Text>
      </View>
    </SafeAreaView>
  );
};

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
    flexDirection: "row",
    alignItems: "center",
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    padding: 4,
    gap: 8,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  tabButtonActive: {
    backgroundColor: "#22A84A",
  },

  tabButtonInactive: {
    backgroundColor: "#E8E8E8",
  },

  tabText: {
    fontSize: 14,
    fontFamily: "semibold",
    color: "#666666",
  },

  tabTextActive: {
    color: "#FFFFFF",
    fontFamily: "bold",
  },

  tabSubText: {
    fontSize: 11,
    fontFamily: "regular",
    color: "#999999",
    marginTop: 4,
  },

  tabSubTextActive: {
    color: "#E8F5E9",
    fontFamily: "medium",
  },

  footer: {
    backgroundColor: "#1A3C2E",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  footerText: {
    color: "#FFFFFF",
    fontFamily: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
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
