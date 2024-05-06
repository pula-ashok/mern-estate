import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/get/${listing.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        } else {
          setLandlord(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </p>
          <textarea
            className="w-full border p-3 rounded-lg"
            name=""
            id=""
            cols=""
            rows="2"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-90"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
