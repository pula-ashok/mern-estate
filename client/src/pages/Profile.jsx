import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signoutFailure,
  signoutStart,
  signoutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);
  const [formData, setFormData] = useState({});
  const [successFlag, setSuccessFlag] = useState(false);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  const fileRef = useRef();
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      setSuccessFlag(false);

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        setSuccessFlag(false);
      } else {
        dispatch(updateSuccess(data));
        setSuccessFlag(true);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setSuccessFlag(false);
    }
  };
  const deleteHandler = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess());
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };
  const signoutHandler = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailure(data.message));
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
      } else {
        setUserListings(data);
      }
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    console.log(listingId);
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      } else {
        setUserListings((prev) =>
          prev.filter((list) => list._id !== listingId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={updateHandler}>
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
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="rounded-lg p-3 border"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rounded-lg p-3 border"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white uppercase p-3 rounded-lg text-center hover:opacity-90 "
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={deleteHandler}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={signoutHandler}>
          Sign Out
        </span>
      </div>
      <p className="text-sm mt-5">
        {error ? (
          <span className="text-red-700">{error}</span>
        ) : successFlag ? (
          <span className="text-green-700">Updated successfully</span>
        ) : (
          ""
        )}
      </p>
      <button className="text-green-700 w-full" onClick={handleShowListings}>
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-2xl text-center mt-7">
            Your Listings
          </h1>
          {userListings.map((list, i) => (
            <div
              key={list._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${list._id}`}>
                <img
                  src={list.imageUrls[0]}
                  alt="litsting cover"
                  className=" w-16 h-16 object-contain"
                />
              </Link>

              <Link
                to={`/listing/${list._id}`}
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
              >
                <p>{list.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button
                  className="text-red-700 uppercase"
                  onClick={() => handleListingDelete(list._id)}
                >
                  Delete
                </button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
