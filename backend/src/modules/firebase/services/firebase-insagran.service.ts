import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseInstagramService extends FirebaseService {
  constructor() {
    super();
  }

  async setInstaData(userId: string, instagramId: string, accessToken: string) {
    try {      
      await this.db
        .collection('shops')
        .doc(String(userId))
        .collection('instagram_accounts')
        .doc(String(instagramId))
        .set({ instagramId, accessToken });
    } catch (error) {
      console.log(error);
    }
  }
}
