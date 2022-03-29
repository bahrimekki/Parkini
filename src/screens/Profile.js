import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Modal,
} from "react-native";
import dateFormat from "dateformat";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { deletebooked, logout, putbooked } from "../Redux/Actions";
import { StatusBar } from "expo-status-bar";
const { height, width } = Dimensions.get("window");
const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    var today = new Date();
    var date = dateFormat(today, "dd/mm/yyyy HH:MM");
    const [activeModal, setActiveModal] = useState(false);
    const users = useSelector((state) => state.UserReducer.user);
    const bookedes = useSelector((state) => state.BookedReducer.bookeds[0]);
    const historiques = useSelector(
        (state) => state.HistoriqueReducer.historique
    );
    const modal = (e) => {
        setActiveModal(true);
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingHorizontal: 20,
                backgroundColor: "#FFFFFF",
            }}
        >
            <StatusBar style="auto" />
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
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 18 }}>Parking :</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "#c3c3c3",
                                    marginLeft: 20,
                                }}
                            >
                                {bookedes === undefined ? "" : bookedes.Parking}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 18 }}>Reserved at :</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "#c3c3c3",
                                    marginLeft: 20,
                                }}
                            >
                                {bookedes === undefined
                                    ? ""
                                    : bookedes.datereservation}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 18 }}>
                                For period of :
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "#c3c3c3",
                                    marginLeft: 20,
                                }}
                            >
                                {bookedes === undefined ? "" : bookedes.period}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 18 }}>Price :</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "#c3c3c3",
                                    marginLeft: 20,
                                }}
                            >
                                {bookedes === undefined
                                    ? ""
                                    : bookedes.price + " TND"}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Payed to validate :
                        </Text>
                        <View
                            style={{
                                height: 2,
                                width: "100%",
                                backgroundColor: "#c3c3c3",
                            }}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 20,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 20,
                                    backgroundColor: "#ffffff",
                                    borderColor: "#c3c3c3",
                                    borderWidth: 4,
                                }}
                            />
                            <Image
                                source={require("../../assets/standard-credit-card.png")}
                                style={{ height: 120, width: 240 }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 20,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 20,
                                    backgroundColor: "#ffffff",
                                    borderColor: "#c3c3c3",
                                    borderWidth: 4,
                                }}
                            />
                            <View
                                style={{
                                    height: 120,
                                    width: 240,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={require("../../assets/smart-flow-pay.png")}
                                    style={{ height: 60, width: 150 }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                height: 40,
                                width: 150,
                                backgroundColor: "blue",
                                borderRadius: 10,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                            }}
                            onPress={() => {
                                dispatch(putbooked());
                                console.log("validate : putbooked");
                                setActiveModal(false);
                            }}
                        >
                            <Text style={{ color: "#ffffff" }}>validate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <View style={styles.infoperson}>
                    <Image
                        source={require("../../assets/user-male-icon.png")}
                        style={{ height: 70, width: 70, borderRadius: 70 }}
                    />
                    <View
                        style={{
                            height: 70,
                            justifyContent: "space-around",
                            marginLeft: 20,
                        }}
                    >
                        <Text
                            style={{
                                height: 25,
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            {users.name}
                        </Text>
                        <Text
                            style={{
                                height: 25,
                                fontSize: 20,
                                color: "#c3c3c3",
                            }}
                        >
                            {users.email}
                        </Text>
                    </View>
                </View>
                <View style={{}}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>Type car :</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#c3c3c3",
                                marginLeft: 20,
                            }}
                        >
                            {users.typecar}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>Serial number :</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#c3c3c3",
                                marginLeft: 20,
                            }}
                        >
                            {users.serialnumber}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        alignSelf: "flex-end",
                        width: 100,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "red",
                        borderRadius: 20,
                        marginTop: 20,
                        flexDirection: "row",
                    }}
                    onPress={() => dispatch(logout())}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 18,
                        }}
                    >
                        LogOut{" "}
                    </Text>
                    <Ionicons name="log-out-outline" color={"#fff"} size={24} />
                </TouchableOpacity>
                <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Current reservation :
                    </Text>
                    <View
                        style={{
                            height: 2,
                            width: "100%",
                            backgroundColor: "#c3c3c3",
                        }}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>Parking :</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#c3c3c3",
                                marginLeft: 20,
                            }}
                        >
                            {bookedes === undefined ? "" : bookedes.Parking}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>reserved at :</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#c3c3c3",
                                marginLeft: 20,
                            }}
                        >
                            {bookedes === undefined
                                ? ""
                                : bookedes.datereservation}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>for period of :</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#c3c3c3",
                                marginLeft: 20,
                            }}
                        >
                            {bookedes === undefined ? "" : bookedes.period}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>Price :</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#c3c3c3",
                                marginLeft: 20,
                            }}
                        >
                            {bookedes === undefined ? "" : bookedes.price}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>State :</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#c3c3c3",
                                marginLeft: 20,
                            }}
                        >
                            {bookedes === undefined ? "" : bookedes.etat}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>Remaining time :</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#c3c3c3",
                                marginLeft: 20,
                            }}
                        >
                            {bookedes === undefined
                                ? ""
                                : bookedes.etat === "reserved"
                                ? (Number(
                                      bookedes.datereservation.slice(11, 13)
                                  ) +
                                      bookedes.period) *
                                      60 +
                                  Number(
                                      bookedes.datereservation.slice(14, 16)
                                  ) -
                                  (Number(date.slice(11, 13)) * 60 +
                                      Number(date.slice(14, 16)))
                                : ""}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            disabled={bookedes === undefined ? true : false}
                            style={{
                                height: 40,
                                width: 150,
                                backgroundColor: "red",
                                borderRadius: 10,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                            onPress={() => {
                                console.log("delete : deletebooked");
                                dispatch(deletebooked());
                            }}
                        >
                            <Ionicons
                                name="trash-outline"
                                color={"#fff"}
                                size={24}
                            />
                            <Text style={{ color: "#ffffff" }}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={bookedes === undefined ? true : false}
                            style={{
                                height: 40,
                                width: 150,
                                backgroundColor: "blue",
                                borderRadius: 10,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                            onPress={() => modal()}
                        >
                            <Ionicons
                                name="checkmark-outline"
                                color={"#fff"}
                                size={24}
                            />
                            <Text style={{ color: "#ffffff" }}>Confirme</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Booking history :
                    </Text>
                    <View
                        style={{
                            height: 2,
                            width: "100%",
                            backgroundColor: "#c3c3c3",
                        }}
                    />
                    <ScrollView
                        style={{
                            marginVertical: 20,
                            width: "100%",
                        }}
                        horizontal={true}
                    >
                        {historiques.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    height: 120,
                                    width: width - 80,
                                    marginHorizontal: 10,
                                    backgroundColor: "#0000ff11",
                                    borderRadius: 10,
                                    padding: 10,
                                }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 18 }}>
                                        Parked on :
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: "#999999",
                                            marginLeft: 20,
                                        }}
                                    >
                                        {item.parking}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 18 }}>
                                        Periode :
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: "#999999",
                                            marginLeft: 20,
                                        }}
                                    >
                                        {item.period} hour
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 18 }}>
                                        Payed :
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: "#999999",
                                            marginLeft: 20,
                                        }}
                                    >
                                        {item.payed} TND
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        alignSelf: "flex-end",
                                        marginTop: 10,
                                        color: "#999999",
                                    }}
                                >
                                    {item.datepark}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    infoperson: {
        marginTop: 40,
        flexDirection: "row",
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
});
