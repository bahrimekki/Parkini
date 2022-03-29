import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View,
    Image,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../Redux/Actions";

const { height, width } = Dimensions.get("window");
const SignIn = ({ navigation }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const name = (name) => {
        setUser({ ...user, name });
    };
    const email = (email) => {
        setUser({ ...user, email });
    };
    const psw = (psw) => {
        setUser({ ...user, psw });
    };
    const typecar = (typecar) => {
        setUser({ ...user, typecar });
    };
    const serialnumber = (serialnumber) => {
        setUser({ ...user, serialnumber });
    };

    const signInHandel = () => {
        console.log("signin: signin");
        dispatch(signin(user, navigation));
    };
    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar style="auto" />
            <View style={styles.backscreen}></View>
            <View style={styles.backscreen2}></View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.titel}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require("../../assets/icon.png")}
                    />
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                        SignIn
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        width: 100,
                        height: 60,
                        elevation: 5,
                        justifyContent: "center",
                        alignSelf: "flex-end",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius: 50,
                    }}
                    onPress={() => navigation.navigate("LogIn")}
                >
                    <Text
                        style={{
                            color: "#0000ff",
                            fontSize: 20,
                            fontWeight: "bold",
                        }}
                    >
                        LogIn
                    </Text>
                </TouchableOpacity>
                <View style={styles.form}>
                    <View style={styles.inputcontener}>
                        <Ionicons
                            name="person-outline"
                            color={"#ccc"}
                            size={26}
                        />
                        <TextInput
                            autoCompleteType="name"
                            placeholder={"Full-Name"}
                            style={styles.input}
                            onChangeText={(e) => name(e)}
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: "#f0f0f0",
                            width: "90%",
                            height: 2,
                        }}
                    />
                    <View style={styles.inputcontener}>
                        <Ionicons
                            name="mail-outline"
                            color={"#ccc"}
                            size={26}
                        />
                        <TextInput
                            autoCompleteType="name"
                            placeholder={"E-mail"}
                            style={styles.input}
                            onChangeText={(e) => email(e)}
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: "#f0f0f0",
                            width: "90%",
                            height: 2,
                        }}
                    />
                    <View style={styles.inputcontener}>
                        <TouchableOpacity
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        >
                            <Ionicons
                                name={
                                    secureTextEntry === true
                                        ? "eye-off-outline"
                                        : "eye-outline"
                                }
                                color={"#000"}
                                size={26}
                            />
                        </TouchableOpacity>
                        <TextInput
                            autoCompleteType="password"
                            placeholder={"Password"}
                            secureTextEntry={secureTextEntry}
                            style={styles.input}
                            onChangeText={(e) => psw(e)}
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: "#f0f0f0",
                            width: "90%",
                            height: 2,
                        }}
                    />
                    <View style={styles.inputcontener}>
                        <Ionicons
                            name="car-sport-outline"
                            color={"#ccc"}
                            size={26}
                        />
                        <TextInput
                            autoCompleteType="name"
                            placeholder={"Type-Car"}
                            style={styles.input}
                            onChangeText={(e) => typecar(e)}
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: "#f0f0f0",
                            width: "90%",
                            height: 2,
                        }}
                    />
                    <View style={styles.inputcontener}>
                        <Ionicons
                            name="barcode-outline"
                            color={"#ccc"}
                            size={26}
                        />
                        <TextInput
                            autoCompleteType="name"
                            placeholder={"Serial-Number"}
                            style={styles.input}
                            onChangeText={(e) => serialnumber(e)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.signupbutton}
                        onPress={() => {
                            signInHandel();
                            navigation.navigate("LogIn");
                        }}
                    >
                        <Ionicons
                            name="checkmark-outline"
                            color={"#fff"}
                            size={26}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#0000ff88",
    },
    backscreen: {
        position: "absolute",
        bottom: -200,
        left: -100,
        width: 800,
        height: 800,
        backgroundColor: "#fff",
        borderRadius: 800,
    },
    backscreen2: {
        position: "absolute",
        bottom: -250,
        right: -200,
        width: 400,
        height: 400,
        backgroundColor: "#0000ff88",
        borderRadius: 800,
    },
    titel: { justifyContent: "center", alignItems: "center", marginTop: 100 },
    form: {
        marginTop: 20,
        height: 300,
        marginRight: 40,
        backgroundColor: "#fff",
        borderTopRightRadius: 150,
        borderBottomRightRadius: 150,
        justifyContent: "center",
        elevation: 5,
        position: "relative",
    },
    inputcontener: {
        width: "80%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 10,
    },
    input: {
        width: "90%",
        height: "100%",
        fontWeight: "bold",
        paddingHorizontal: 5,
        fontSize: 20,
    },
    signupbutton: {
        height: 60,
        width: 60,
        position: "absolute",
        top: 120,
        right: -30,
        backgroundColor: "#0000ff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        elevation: 10,
    },
});
