import mongoose from "mongoose";
const createConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log(error));
};

export default createConnection;
