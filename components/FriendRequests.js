import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getFriendRequests, updateFriendRequest } from "../middleware/api";
import FriendRequestItem from "./FriendRequestItem";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const requests = await getFriendRequests();
      setFriendRequests(requests);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const handleAccept = async (requestId) => {
    await updateFriendRequestStatus(requestId, "accepted");
  };

  const handleDecline = async (requestId) => {
    await updateFriendRequestStatus(requestId, "rejected");
  };

  const updateFriendRequestStatus = async (requestId, status) => {
    try {
      await updateFriendRequest(requestId, status);
      fetchFriendRequests();
    } catch (error) {
      console.error("Error updating friend request:", error);
    }
  };

  return (
    <View style={styles.friendRequestsContainer}>
      <Text>Friend Requests:</Text>
      <FlatList
        data={friendRequests}
        renderItem={({ item }) => (
          <FriendRequestItem
            request={item}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  friendRequestsContainer: {
    height: "40%",
    paddingHorizontal: 15,
  },
});

export default FriendRequests;
