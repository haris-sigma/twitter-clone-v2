import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ userId, postId, newPostContent, newFile }) => {
    // Removed semicolon before the parameters.
    try {
      let newImageUrl;

      if (newFile) {
        const imageRef = ref(storage, `posts/${newFile.name}`);
        const response = await uploadBytes(imageRef, newFile);
        newImageUrl = await getDownloadURL(response.ref);
      }

      const postRef = doc(db, `users/${userId}/posts/${postId}`);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const postData = postSnap.data();
        const imageUrl = newImageUrl ?? postData.imageUrl ?? "";
        // const imageUrl = null ?? postData.imageUrl ?? "";
        // const imageUrl =  postData.imageUrl ?? "";
        // const imageUrl =  null ?? "";
        // const imageUrl =   "";
        const updatedData = {
          ...postData,
          content: newPostContent || postData.content,
          imageUrl,
        };
        await updateDoc(postRef, updatedData);
        const updatedPost = { id: postId, ...updatedData };
        return updatedPost;
      } else {
        throw new Error("post does not exist");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchByUser",
  async (userId) => {
    try {
      const postsRef = collection(db, `users/${userId}/posts`);

      const querySnapshot = await getDocs(postsRef);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return docs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const savePost = createAsyncThunk(
  "posts/savePost",
  async ({ userId, postContent, file }) => {
    try {
      let imageUrl = "";
      console.log(file);
      if (file !== null) {
        const imageRef = ref(storage, `posts/${file.name}`);
        const response = await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(response.ref);
      }
      const postsRef = collection(db, `users/${userId}/posts`);
      const newPostRef = doc(postsRef);
      await setDoc(newPostRef, { content: postContent, likes: [], imageUrl });
      const newPost = await getDoc(newPostRef);

      const post = { id: newPost.id, ...newPost.data() };
      // const post = { id: 'a', ...{content: 'hello', likes: [], imageUrl: 'aa'} };
      // const post = { id: 'a', content: 'hello', likes: [], imageUrl: 'aa' };

      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ userId, postId }) => {
    try {
      const postRef = doc(db, `users/${userId}/posts/${postId}`);

      const docSnap = await getDoc(postRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();
        const likes = [...postData.likes, userId];

        await setDoc(postRef, { ...postData, likes });
      }

      return { userId, postId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const removeLikeFromPost = createAsyncThunk(
  "posts/removeLikeFromPost",
  async ({ userId, postId }) => {
    try {
      const postRef = doc(db, `users/${userId}/posts/${postId}`);

      const docSnap = await getDoc(postRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();
        const likes = postData.likes.filter((id) => id !== userId);

        await setDoc(postRef, { ...postData, likes });
      }

      return { userId, postId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        // action.payload = const post = { id: 'a', content: 'hello', likes: [], imageUrl: 'aa' };
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { userId, postId } = action.payload;

        const postIndex = state.posts.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          state.posts[postIndex].likes.push(userId);
        }
      })
      .addCase(removeLikeFromPost.fulfilled, (state, action) => {
        const { userId, postId } = action.payload;

        const postIndex = state.posts.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
            (id) => id !== userId
          );
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;

        const postIndex = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        );

        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      });
  },
});

export default postsSlice.reducer;
