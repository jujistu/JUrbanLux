import mongoose from 'mongoose';

const connectToDB = async () => {
  const connectionUrl =
    'mongodb+srv://obiorapaschalugwu:Qwerty2580@juexpressdb.6nc6mts.mongodb.net/';

  mongoose
    .connect(connectionUrl)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(`getting error ${err.message}`));
};

export default connectToDB;
