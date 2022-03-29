import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import {
    StyleSheet,
    Dimensions,
    Image,
    View,
    TextInput,
    ScrollView,
    Animated,
    TouchableOpacity,
    Text,
    Modal,
} from "react-native";
import * as Location from "expo-location";
import {
    addbooked,
    current,
    getbooked,
    gethistorique,
    getparking,
} from "../Redux/Actions";
import dateFormat from "dateformat";

const { height, width } = Dimensions.get("window");

const Map = ({ navigation }) => {
    const dispatch = useDispatch();
    var today = new Date();
    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("map: getparking,getuser,getbooked");
            dispatch(getparking());
            dispatch(current());
            dispatch(getbooked());
            dispatch(gethistorique());
        }, 5000);
        return () => clearInterval(intervalId);
    }, [dispatch]);
    const parkinges = useSelector((state) => state.ParkingReducer.parkings);
    const [activeModal, setActiveModal] = useState(false);
    const [activeModalAdd, setActiveModalAdd] = useState(false);
    const [active, setActive] = useState("1");
    const [parkingSelected, setParkingSelected] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [period, setPeriod] = useState(1);

    const searchpos = [
        {
            latitude: 36.801584,
            longitude: 10.181086,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
        {
            latitude: 37.214739,
            longitude: 10.12249,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
    ];

    const markercurrent = require("../../assets/current_location.png");
    const search = (e) => {
        if (e.toLowerCase() === "tunis") {
            setRegion(searchpos[0]);
        }
        if (e.toLowerCase() === "ras jebel") {
            setRegion(searchpos[1]);
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    let latitudeloc = "37.214739";
    let longitudeloc = "10.12249";
    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        latitudeloc = JSON.stringify(location.coords.latitude);
        longitudeloc = JSON.stringify(location.coords.longitude);
    }
    const [region, setRegion] = useState({
        latitude: parseFloat(latitudeloc),
        longitude: parseFloat(longitudeloc),
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });

    const modal = (e) => {
        setActiveModal(true);
        setParkingSelected(e);
    };
    const modaladd = () => {
        setActiveModalAdd(true);
    };
    return (
        <View style={styles.contener}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={activeModalAdd}
                onBackdropPress={() => setActiveModalAdd(false)}
                onBackButtonPress={() => setActiveModalAdd(false)}
                onSwipeComplete={() => setActiveModalAdd(false)}
            >
                <TouchableOpacity
                    onPress={() => setActiveModalAdd(false)}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: width,
                        height: height,
                        backgroundColor: "#00000099",
                    }}
                />
                {/* <View style={styles.modalAddContener}> */}
                <ScrollView style={styles.modalAddContener}>
                    <View
                        style={{
                            width: "100%",
                            height: 200,
                            backgroundColor: "#f9f9f9",
                            marginVertical: 10,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={require("../../assets/chatmami.jpeg")}
                            style={{ height: 150, width: "100%" }}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                alignSelf: "center",
                                marginTop: 10,
                            }}
                        >
                            Chat Mami
                        </Text>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: 200,
                            backgroundColor: "#f9f9f9",
                            marginVertical: 10,
                            elevation: 5,
                            textAlign: "center",
                        }}
                    >
                        <Image
                            source={require("../../assets/mausoleesidiarbi.jpeg")}
                            style={{ height: 150, width: "100%" }}
                        />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                alignSelf: "center",
                                marginTop: 5,
                                textAlign: "center",
                            }}
                        >
                            zaouïa Sidi el Arbi Ben Hammou
                        </Text>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: 200,
                            backgroundColor: "#f9f9f9",
                            marginVertical: 10,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={require("../../assets/terrainfoot.jpeg")}
                            style={{ height: 150, width: "100%" }}
                        />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                alignSelf: "center",
                                marginTop: 5,
                                textAlign: "center",
                            }}
                        >
                            terrain flèche sportive Ras Jebel
                        </Text>
                    </View>
                </ScrollView>
                {/* </View> */}
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={activeModal}
                onBackdropPress={() => setActiveModal(false)}
                onBackButtonPress={() => setActiveModal(false)}
                onSwipeComplete={() => setActiveModal(false)}
            >
                <TouchableOpacity
                    onPress={() => setActiveModal(false)}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: width,
                        height: height,
                        backgroundColor: "#00000099",
                    }}
                />
                <View style={styles.modalContener}>
                    <View style={styles.modalContenerHeader}>
                        <Text>
                            {!parkingSelected ? "...." : parkingSelected.title}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 2,
                            width: "100%",
                            backgroundColor: "#c3c3c3",
                        }}
                    />
                    <View style={styles.modalContenerContent}>
                        <Text>
                            {"Price : "}
                            {!parkingSelected
                                ? "...."
                                : parkingSelected.price * period}
                            {" TND"}
                        </Text>
                        <Text>
                            {"rating : "}
                            {!parkingSelected ? "...." : parkingSelected.rating}
                        </Text>
                        <Text>
                            {"capacity : "}
                            {!parkingSelected ? "...." : parkingSelected.spots}
                        </Text>
                        <Text>
                            {"Free : "}
                            {!parkingSelected ? "...." : parkingSelected.free}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 2,
                            width: "100%",
                            backgroundColor: "#c3c3c3",
                        }}
                    />
                    <View style={styles.modalContenerFooter}>
                        <Text>choose the period</Text>
                        <View
                            style={{
                                width: "50%",
                                height: 40,
                                marginBottom: 50,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: "20%",
                                    height: 40,
                                    borderColor: "#c3c3c3",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() =>
                                    period > 1
                                        ? setPeriod(period - 1)
                                        : setPeriod(period)
                                }
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                    }}
                                >
                                    -
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    width: "60%",
                                    height: 40,
                                    fontSize: 18,
                                    borderColor: "#c3c3c3",
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    marginHorizontal: 2,
                                }}
                            >
                                0{period}:00
                            </Text>
                            <TouchableOpacity
                                style={{
                                    width: "20%",
                                    height: 40,
                                    borderColor: "#c3c3c3",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() =>
                                    period < 9
                                        ? setPeriod(period + 1)
                                        : setPeriod(period)
                                }
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                    }}
                                >
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 200,
                                height: 50,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#0000ff",
                            }}
                            onPress={() => {
                                dispatch(
                                    addbooked({
                                        Parking: parkingSelected.title,
                                        datereservation: dateFormat(
                                            today,
                                            "dd/mm/yyyy HH:MM"
                                        ),
                                        period: period,
                                        price: parkingSelected.price * period,
                                        owner: "mekkibahri15@gmail.com",
                                        etat: "pre-reserved",
                                    })
                                );
                                console.log("booking : addbooked");
                                setActiveModal(false);
                                navigation.navigate("Profile");
                            }}
                        >
                            <Text
                                style={{
                                    color: "#ffffff",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}
                            >
                                Booking
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/serchlocation.png")}
                    style={{ height: 20, width: 20 }}
                />
                <TextInput
                    autoCompleteType="name"
                    placeholder="Search"
                    style={styles.searchinput}
                    onChangeText={(e) => search(e)}
                />
            </View>
            <MapView loadingEnabled={true} region={region} style={styles.map}>
                <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(latitudeloc),
                        longitude: parseFloat(longitudeloc),
                    }}
                    title={latitudeloc}
                    description={longitudeloc}
                >
                    <View
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 32,
                            backgroundColor: "#0000ff22",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10,
                                backgroundColor: "#0000ff",
                            }}
                        ></View>
                    </View>
                </MapView.Marker>
                {parkinges.map((item, index) => (
                    <MapView.Marker key={index} coordinate={item.location}>
                        <View
                            style={[
                                styles.parkmap,
                                {
                                    borderColor:
                                        active === item._id ? "red" : "black",
                                },
                            ]}
                        >
                            <Text>{item.free}</Text>
                        </View>
                    </MapView.Marker>
                ))}
            </MapView>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 140,
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() =>
                    setRegion({
                        latitude: parseFloat(latitudeloc),
                        longitude: parseFloat(longitudeloc),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    })
                }
            >
                <Image
                    source={require("../../assets/current_location.png")}
                    style={{ height: 30, width: 30 }}
                />
            </TouchableOpacity>
            <ScrollView style={styles.listparkings} horizontal={true}>
                {parkinges.map((item, index2) => (
                    <TouchableOpacity
                        key={index2}
                        style={styles.parking}
                        onPress={() => {
                            setActive(item._id);
                            setRegion({
                                latitude: item.location.latitude,
                                longitude: item.location.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            });
                        }}
                    >
                        <View
                            style={{
                                width: "50%",
                                height: "100%",
                                justifyContent: "center",
                            }}
                        >
                            <View>
                                <Text>
                                    {item.title} ({item.free}/{item.spots})
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: "90%",
                                    height: 40,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        width: "20%",
                                        height: 40,
                                        borderColor: "#c3c3c3",
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onPress={() =>
                                        period > 1
                                            ? setPeriod(period - 1)
                                            : setPeriod(period)
                                    }
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        width: "60%",
                                        height: 40,
                                        fontSize: 18,
                                        borderColor: "#c3c3c3",
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        marginHorizontal: 2,
                                    }}
                                >
                                    0{period}:00
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        width: "20%",
                                        height: 40,
                                        borderColor: "#c3c3c3",
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onPress={() =>
                                        period < 9
                                            ? setPeriod(period + 1)
                                            : setPeriod(period)
                                    }
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                width: "20%",
                                height: "100%",
                                justifyContent: "center",
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={require("../../assets/price.png")}
                                    style={{ height: 20, width: 20 }}
                                />
                                <Text>{item.price}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={require("../../assets/rate.png")}
                                    style={{ height: 20, width: 20 }}
                                />
                                <Text>{item.rating}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: "30%",
                                height: "100%",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: "blue",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={() => modal(item)}
                            >
                                <Text
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.price * period} TND
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={{
                    width: 75,
                    height: 75,
                    backgroundColor: "#ff000033",
                    borderRadius: 75,
                    position: "absolute",
                    top: 150,
                    right: 10,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress={() => modaladd()}
            >
                <Image
                    source={require("../../assets/parasol.webp")}
                    style={{
                        height: 65,
                        width: 65,
                        borderRadius: 55,
                        borderWidth: 5,
                        borderColor: "#ff000055",
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    contener: { flex: 1, backgroundColor: "#ffffff" },
    header: {
        flex: 0.5,
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    map: {
        flex: 3,
    },
    searchinput: {
        width: "90%",
        height: 40,
        fontWeight: "bold",
        paddingHorizontal: 10,
        fontSize: 20,
    },
    listparkings: {
        position: "absolute",
        right: 10,
        left: 10,
        bottom: 0,
    },
    parking: {
        height: 110,
        width: width - 60,
        margin: 10,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
    },
    parkmap: {
        height: 32,
        width: 32,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContener: {
        backgroundColor: "#ffffff",
        height: height * 0.75,
        borderRadius: 10,
        padding: 20,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalAddContener: {
        backgroundColor: "#ffffff",
        height: height * 0.5,
        borderRadius: 10,
        paddingHorizontal: 20,
        position: "absolute",
        left: 20,
        right: 95,
        top: 125,
    },
    modalContenerHeader: { height: "50%" },
    modalContenerContent: {
        flexDirection: "row",
        height: "10%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalContenerFooter: {
        height: "40%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
});

export default Map;
