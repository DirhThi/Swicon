import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled,color,mb  }) => {
  const navigation = useNavigation();
  return (
    <View style={{alignSelf:"flex-start", marginBottom:mb}}>

    <View style={tw("p-2 flex-row items-center justify-between")}>
      <View style={tw("p-2 flex-row items-center")}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw("p-2")}>
          <Ionicons name="chevron-back-outline" size={24} color={color} />
        </TouchableOpacity>
        <Text style={tw("text-xl font-bold pl-2")}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={tw("rounded-full mr-4 p-3 bg-red-200")}>
          <Foundation name="telephone" size={20} color="#FF5864" />
        </TouchableOpacity>
      )}
    </View>
    </View>

  );
};

export default Header;
