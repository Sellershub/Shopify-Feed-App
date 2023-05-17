import { ServiceAccount } from 'firebase-admin';

export const adminConfig = {
  // projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  apiKey: 'AIzaSyBcq_PduWTSANrX0GdHqJHSdNPDEA0kbb4',
  authDomain: 'nestbackenddatabase.firebaseapp.com',
  databaseURL:
    'https://nestbackenddatabase-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'nestbackenddatabase',
  storageBucket: 'nestbackenddatabase.appspot.com',
  messagingSenderId: '455515018075',
  appId: '1:455515018075:web:54c5fcae1427c22ddc407e',
  measurementId: 'G-DV6KZRC22V',
};
