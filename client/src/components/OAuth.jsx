import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleHandleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const { displayName, email, photoURL } = result.user;
      const response = await fetch(`/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: displayName, email, photo: photoURL }),
      });
      const data = await response.json();
      if (data) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log("could not perform with google auth", error);
    }
  };
  return (
    <button
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
      onClick={googleHandleClick}
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
