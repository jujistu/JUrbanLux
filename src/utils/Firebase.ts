export const firebaseConfig = {
  apiKey: process.env.apiKey!,
  authDomain: process.env.authDomain!,
  projectId: process.env.projectId!,
  storageBucket: 'juexpress-nextjs.appspot.com', //process.env.storageBucket!,
  messagingSenderId: process.env.messagingSenderId!,
  appId: process.env.appId!,
  measurementId: process.env.measurementId!,
};

export const firebaseStorageURL = process.env.firebaseStorageURL!;
