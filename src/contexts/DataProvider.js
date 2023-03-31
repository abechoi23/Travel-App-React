import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, getDocs, collection, doc, getDoc, addDoc, Timestamp, collectionGroup, query, deleteDoc } from "@firebase/firestore";
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext();

export const DataProvider = function (props) {
  const [posts, setPosts] = useState([]);
  const [history, setHistory] = useState([]);
  const { user } = useContext(AuthContext);
  const db = getFirestore();
  console.log(posts);

  useEffect(() => {
    async function getPost() {
      const postQuery = query(collectionGroup(db, 'savedTrip'))
      const querySnapshot = await getDocs(postQuery);
      const loadedPosts = [];
      querySnapshot.forEach((doc) => {
        loadedPosts.push({
          id: doc.id,
          uid: doc.ref.parent.parent.id,
          ...doc.data(),
        });
      });
      setPosts(loadedPosts);
      setHistory(loadedPosts.filter(item => item.uid === user.uid));
    }
    getPost();
  }, [user]);
  
  async function fetchPost(uid, id) {
    const docRef = doc(db, 'users', uid, "posts", id);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
        throw new Error()
    }
    return docSnap.data()
  }
  
  const deleteItem = async (id) => {
    const historyDoc = doc(db, "savedTrip", id);
    await deleteDoc(historyDoc);
    setPosts(posts.filter((item) => item.id !== id));
  };

  const value = {
    posts,
    fetchPost,
    deleteItem
  };
  
  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  );
};
