import React from "react";
import { SafeAreaView } from "react-navigation";
import Map from "../components/Map";
import { StatusBar } from "expo-status-bar";

const MapScreen = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
            }}
        >
            <StatusBar style="auto" />
            <Map navigation={navigation} />
        </SafeAreaView>
    );
};

export default MapScreen;
