import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Camera } from "../components/Camera";
import { createPost } from "../middleware/api";


const UploadScreen = ({ userId }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const cameraRef = useRef();

  const handleCapture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takeImageHandler();
      setImage(data.assets[0]);  // Set the entire data object, not just the uri
    }
  };

  const handlePost = async () => {
    if (caption && image) {
      try {
        await createPost({
          userId,
          caption,
          image: image.base64,
        });
        setCaption("");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        "Missing data!",
        "Please enter a caption and take a photo.",
        [{ text: "OK" }]
      );
    }
  };

  


  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.screen}>
      <View style={{ height: 0 }}>
        <Camera ref={cameraRef} />
      </View>
      <View style={styles.imagePreview}>
        {!image ? (
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              onPress={handleCapture}
              style={styles.captureButton}
            >
              <Text style={styles.buttonText}>CAPTURE</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageContainer}>
           <Image source={{ uri: image ? `data:image/jpeg;base64,${image.base64}` : null }} style={styles.image} />
          </View>
        )}
      </View>
      <View style={styles.captionContainer}></View>
      <TextInput
        style={styles.captionInput}
        placeholder="Enter caption..."
        value={caption}
        onChangeText={setCaption}
      />
      {image && (
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            onPress={handleDeleteImage}
            style={styles.captureButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <Button title="Post" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  captionContainer: {
    padding: 20,
  },
  captionInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  captionInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  captureButtonContainer: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 30,
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  captureButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "center",
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
});

export default UploadScreen;
