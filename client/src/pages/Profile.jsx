import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef();
  console.log(uploadPercentage);
  console.log(formData);
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);
  const handleUpload = async () => {
    try {
      setUploadError(false);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadPercentage(Math.round(progress));
        },
        (error) => {
          setUploadError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, photo: downloadURL })
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.photo || currentUser.photo}
          alt="user"
          className="w-24 h-24 rounded-full cursor-pointer mt-2 self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">
              Upload image error(image file must be less than 2MB)
            </span>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <span className="text-slate-700">
              Uploading the image {uploadPercentage} %
            </span>
          ) : uploadPercentage === 100 ? (
            <span className="text-green-700"> Image upload successfully</span>
          ) : null}
        </p>

        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="rounded-lg p-3 border"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="rounded-lg p-3 border"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rounded-lg p-3 border"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
