import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FriendRequestItem = ({ request, handleAccept, handleDecline }) => {
  return (
    <View style={styles.requestItem}>
      <Text style={styles.requesterName}>
        {request.requester.firstName} {request.requester.lastName}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAccept(request._id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => handleDecline(request._id)}
        >
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  requestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  requesterName: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  declineButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FriendRequestItem;
