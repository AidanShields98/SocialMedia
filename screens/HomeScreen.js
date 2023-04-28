import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { getPosts } from '../middleware/api';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const renderItem = ({ item }) => {
    const imageUri = `data:image/jpeg;base64,${item.image}`;

    return (
      <Card containerStyle={styles.card}>
        <Image source={{ uri: imageUri }} style={styles.postImage} />
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
        <Text style={styles.uploadTime}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    width: '80%',
    height: 410,
    margin: 50,
  },
  postImage: {
    width: 330,
    height: '90%',
    resizeMode: 'cover',
  },
  uploadTime: {
    fontSize: 12, 
    color: 'gray' 
  },
  captionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
  },
  caption: { 
    fontSize: 16, 
    textAlign: 'center' 
  },
});

export default HomeScreen;
