import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View,
    Image,
    Dimensions,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../Redux/Actions";

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem("@lngu", value);
    } catch (e) {
        console.log(e);
    }
};
const { height, width } = Dimensions.get("window");
const LogIn = ({ navigation }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.UserReducer.load);
    const [user, setUser] = useState({});
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const email = (email) => {
        setUser({ ...user, email });
    };
    const psw = (psw) => {
        setUser({ ...user, psw });
    };
    const signInHandel = () => {
        console.log("signin: login");
        dispatch(login(user, navigation));
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
                        LogIn
                    </Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputcontener}>
                        <Ionicons
                            name="person-outline"
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
                    <TouchableOpacity
                        style={styles.signupbutton}
                        onPress={() => signInHandel()}
                    >
                        <Ionicons
                            name="arrow-forward-outline"
                            color={"#fff"}
                            size={26}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        color: "#0000ff",
                        fontSize: 20,
                        fontWeight: "normal",
                        alignSelf: "flex-end",
                        marginTop: 40,
                        marginRight: 20,
                        flexDirection: "row",
                    }}
                >
                    <Ionicons
                        name="language-outline"
                        color={"#0000ff88"}
                        size={26}
                    />
                    <Text
                        style={{
                            color: "#0000ff88",
                            fontSize: 20,
                            fontWeight: "normal",
                        }}
                    >
                        language
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 40,
                        width: 100,
                        height: 60,
                        elevation: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                    }}
                    onPress={() => navigation.navigate("SignIn")}
                >
                    <Text
                        style={{
                            color: "#0000ff",
                            fontSize: 20,
                            fontWeight: "bold",
                        }}
                    >
                        SignIn
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal transparent={true} visible={loading ? true : false}>
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: width,
                        height: height,
                        backgroundColor: "#00000099",
                    }}
                />
                <Image
                    style={{
                        marginTop: height / 2 - 128,
                        resizeMode: "contain",
                        maxWidth: 256,
                        maxHeight: 256,
                        alignSelf: "center",
                    }}
                    source={require("../../assets/loading.gif")}
                />
                <Text
                    style={{
                        color: "#ffffff",
                        fontSize: 28,
                        fontWeight: "bold",
                        alignSelf: "center",
                    }}
                >
                    LOADING...
                </Text>
            </Modal>
        </SafeAreaView>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#0000ff88",
    },
    backscreen: {
        position: "absolute",
        bottom: -200,
        right: -100,
        width: 800,
        height: 800,
        backgroundColor: "#fff",
        borderRadius: 800,
    },
    backscreen2: {
        position: "absolute",
        bottom: -250,
        left: -200,
        width: 400,
        height: 400,
        backgroundColor: "#0000ff88",
        borderRadius: 800,
    },
    titel: { justifyContent: "center", alignItems: "center", marginTop: 100 },
    form: {
        marginTop: 20,
        height: 140,
        marginRight: 40,
        backgroundColor: "#fff",
        borderTopRightRadius: 140,
        borderBottomRightRadius: 140,
        justifyContent: "space-around",
        elevation: 5,
        position: "relative",
    },
    inputcontener: {
        width: "90%",
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
        height: 50,
        width: 50,
        position: "absolute",
        top: 45,
        right: -25,
        zIndex: 100,
        backgroundColor: "#0000ff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        elevation: 10,
    },
});
