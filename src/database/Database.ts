import mongoose from 'mongoose';

const connectToDB = async () => {
  const connectionUrl = process.env.connectionUrl!;

  mongoose
    .connect(connectionUrl)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(`getting error ${err.message}`));
};

export default connectToDB;
