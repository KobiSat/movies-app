import mongoose from "mongoose";

const connectDB = async (conStr) => {
  try {

    const con = await mongoose.connect(conStr);
    console.log(`Mongo DB connected: ${con.connection.host}`);
  } catch (err) {
    console.log(`Error ${err.message}`);
    process.exit(1);
  }
};
export { connectDB };
