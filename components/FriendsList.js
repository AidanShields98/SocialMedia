import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { getFriends } from '../middleware/api';

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

  const fetchImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const base64String = await blobToBase64(blob);
      return `data:${response.headers.get('content-type')};base64,${base64String}`;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  };

  const renderItem = ({ item }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
      fetchImage(item.avatar)
        .then((base64Image) => setImage(base64Image));
    }, []);

    return (
      <View style={styles.friendItem}>
        <Image source={{ uri: image }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{item.firstName}</Text>
          <Text style={styles.lastName}>{item.lastName}</Text>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
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

  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  nameContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },

  firstName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },

  lastName: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default FriendsList;
