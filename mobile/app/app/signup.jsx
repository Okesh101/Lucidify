import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import Input from "../components/input";
import Button from "../components/button";




const SignUp = () => {
  return (

    <SafeAreaView style={styles.Container}>

        <View style={{gap:10}}>

    <View style={{flexDirection:"row", justifyContent:'center', marginTop:80,}}>

        <View>
            <Image style={{width:50, height:50, marginRight:10}} source={require("../assets/images/insurance.png")}/>
        </View>


      <View style={styles.safeView}>
        <Text style={{ color: "#0000", justifyContent: "center", fontFamily: 'bold', fontSize:18 }}>SME Compliance</Text>
        <Text style={{fontFamily:"SemiBold", color:"#145C2F"}}>Fast-Track</Text>
      </View>

    </View>

     <Text style={{justifyContent:"center",textAlign:"center",fontFamily:"medium"}}>One form. Four minutes. Zero lawyers</Text>

     </View>



     <View style={styles.centerView}>

        <View style={styles.tabsRow}>
            <TouchableOpacity style={styles.activeTab}>
                <Text  style={styles.activeTabText}> Login</Text>
            </TouchableOpacity>

             <TouchableOpacity onPress={( ) => {
                
             }} style={styles.inactiveTab}>
                <Text style={styles.inactiveTabText}>Sign Up</Text>
            </TouchableOpacity>
        </View>


    <Text style={styles.welcomeText}>Welcome back</Text>
    <Text style={{fontSize:11, marginVertical:10, fontFamily:"regular"}}>Login to continue filing your CAC Annual Return </Text>


    <Text style={{marginVertical:10, fontFamily:"medium"}}>Email</Text>
    <Input title="JohnDoe@" />


    <Text style={{marginVertical:10,marginTop:20, fontFamily:"medium"}}>Password</Text>
    <Input title="********" security={true} />

    <Text style={{textAlign:"right", marginTop:15, fontFamily:"regular", color:'#22A84A', fontSize:12}}>Forgot Password?</Text>
    <View style={{flexDirection:"row", alignSelf:'center', marginTop:20}}>
        <Text style={{fontFamily:"thin", fontSize:12}}>Don't have an account?</Text>
        <Text style={{color:"#22A84A", fontFamily:"regular", fontSize:12}}> Create one</Text>
    </View>


    <Button title="Login" />
     </View>

    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
    Container : {
        flex : 1,
        backgroundColor: "#E8F5EE",
        
        
    },

    safeView : {
        flexDirection:"column",
        justifyContent:"center",
        alignSelf:"center"
    },

    centerView :  {
    width: '90%',
    height: 500,
    margin:20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
    
    // 1. Edges
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Soft white border
    
    // 2. Shadows for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    
    // 3. Shadows for Android
    elevation: 10,
    
    padding: 20,
  },

  tabsRow : {
    flexDirection:"row", 
    justifyContent:"space-evenly",
    backgroundColor: "#D4EDE0",        // muted green tab container
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
    fontFamily:"SemiBold",
    fontSize: 14,
    
  },

  inactiveTabText: {
    color: "#6B9E7E",
    fontSize: 14,
    fontFamily:"medium"
    
  },

  welcomeText :{
    fontSize:20,
    fontFamily:"SemiBold",
    color:"#1E5C38"
  }

})


export default SignUp;