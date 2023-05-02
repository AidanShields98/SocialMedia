import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { getFriends } from "../middleware/api";
import FriendItem from "./FriendItem";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const fetchedFriends = await getFriends();
      setFriends(fetchedFriends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const renderItem = ({ item }) => {
    return <FriendItem friend={item} />;
  };

  return (
    <View style={styles.container}>
       <Text style={styles.friendText}>Friends List</Text>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendText:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  }
});

export default FriendsList;
