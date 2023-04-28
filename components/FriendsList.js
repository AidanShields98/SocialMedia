import React, { useState, useEffect } from "react";

import { StyleSheet, View, Text, FlatList } from "react-native";


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
  
  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>
                            {item.firstName} {item.lastName}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  friendItem: {
    paddingHorizontal: 10,

    paddingVertical: 5,
  },

  friendName: {
    fontSize: 16,
  },
});

export default FriendsList;
