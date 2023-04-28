// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { searchUsers } from "../middleware/api";

// const SocialScreen = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const searchUsersWrapper = async () => {
//     try {
//       const users = await searchUsers(searchTerm);
//       setSearchResults(users);
//     } catch (error) {
//       console.error("Error searching users:", error);
//     }
//   };

  
  
//   const handleAddFriend = async (friendId) => {
//     try {
//       const response = await sendFriendRequest(friendId);
//       // Update the UI based on the response
//     } catch (error) {
//       console.error("Error sending friend request:", error);
//     }
//   };
  

//   const renderUser = ({ item }) => (
//     <TouchableOpacity style={styles.userItem}>
//       <View style={styles.avatarPlaceholder}>
//         <Image
//           source={{
//             uri: item?.profilePicture
//               ? `data:image/jpeg;base64,${item.profilePicture}`
//               : 'https://via.placeholder.com/150',
//             base64: true,
//           }}
//           style={styles.avatar}
//         />
//       </View>
//       <Text style={styles.userName}>{item.firstName + " " + item.lastName}</Text>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => handleAddFriend(item._id)}
//       >
//         <Text style={styles.addButtonText}>Add</Text>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
  
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         onChangeText={setSearchTerm}
//         value={searchTerm}
//         placeholder="Search for friends..."
//         onSubmitEditing={() => searchUsersWrapper()}
//       />
//       <FlatList
//         data={searchResults}
//         renderItem={renderUser}
//         keyExtractor={(item) => item._id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 15,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   userItem: {
//     padding: 15,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 5,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   avatarPlaceholder: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   userName: {
//     fontSize: 16,
//   },
//   addButton: {
//     backgroundColor: "#1e90ff",
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });


// export default SocialScreen;


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import FriendRequests from "../components/FriendRequests";
import FriendsList from "../components/FriendsList";
import SearchModal from "../components/SearchModal";

const SocialScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FriendRequests />
      <FriendsList />
      <TouchableOpacity style={styles.searchButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <SearchModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SocialScreen;

