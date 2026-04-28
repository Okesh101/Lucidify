import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


const steps = [
  {title: "Verification", pathname: "/verification", number: 1},
  {title: "Questions", pathname: "/question", number: 2},
  {title: "Review", pathname: "/review", number: 3}
];

export const CurrentTabNNumber = () => {
  const currentStep = 1;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;

          return (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepRow}>
                <View
                  style={[
                    styles.stepCircle,
                    {backgroundColor: isActive ? "#22A84A" : "#D1D5DB"},
                  ]}
                >
                  <Text style={[styles.stepNumber, {color: isActive ? "#FFFFFF" : "#6B7280"}]}>
                    {step.number}
                  </Text>
                </View>

                {index < steps.length - 1 && (
                  <View style={styles.lineWrapper}>
                    <View
                      style={[
                        styles.stepLine,
                      ]}
                    />
                  </View>
                )}
              </View>

              <Text style={styles.stepLabel}>{step.title}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 40,
    marginHorizontal: 50,
    width: "100%",
    paddingHorizontal: 10,
    
  },
  stepContainer: {
    flex: 1,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    fontFamily: "bold",
    fontSize: 14,
  },
  lineWrapper: {
    flex: 1,
    height: 2,
    justifyContent: "center",
    marginHorizontal: 8
  },
  stepLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#D1D5DB"
  },
  stepLabel: {
    fontSize: 12,
    color: "#4B5563",
    fontFamily: "semibold",
  },
});
