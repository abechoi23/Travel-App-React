import { useState, useEffect, createContext } from "react";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = function (props) {
  const [user, setUser] = useState({
    loggedIn: false,
  });

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser({ loggedIn: true, ...userCredential.user });
    } catch (error) {
      console.error(error);
    }
  }

  async function signInWithGoogle() {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser({ loggedIn: true, ...userCredential.user });
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    await signOut(auth);
    setUser({ loggedIn: false });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
      setUser({ loggedIn: true, ...userData });
      } else {
      setUser({ loggedIn: false });
      }
      });
      return unsubscribe;
      }, [auth]);
      
      const value = {
      login,
      signInWithGoogle,
      logout,
      user,
      };
      
      return (
      <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
      );
      };