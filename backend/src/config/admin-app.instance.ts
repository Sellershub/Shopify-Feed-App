import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { resolve } from 'path';

admin.initializeApp({
  credential: admin.credential.cert(
    resolve(__dirname,'..','..','..','feedapp-17ee8-firebase-adminsdk-lxakk-3498bf9c1f.json')
    // '/Users/mac/Desktop/Vovk/shopifyapp-feed-clone/backend/feedapp-17ee8-firebase-adminsdk-lxakk-3498bf9c1f.json',

    // '/Users/mac/Desktop/Vovk/shopifyapp-feed-clone/backend/nestbackenddatabase-firebase-adminsdk-2g398-93dd595b71.json',
  ),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
export const database = getFirestore();
