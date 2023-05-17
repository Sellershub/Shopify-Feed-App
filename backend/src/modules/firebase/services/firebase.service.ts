import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { database } from '../../../config/admin-app.instance';

@Injectable()
export class FirebaseService {
  db: admin.firestore.Firestore;
  constructor() {
    this.db = database;
  }

  get database() {
    return this.db;
  }
}
