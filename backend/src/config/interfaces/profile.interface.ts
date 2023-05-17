import { Email } from './email.interface';
import { Json } from './json.interface';

export interface Profile {
  provider: string;
  id: number;
  displayName: string;
  username: string;
  profileURL: string;
  emails: Email[];
  _raw: string;
  _json: Json;
}
