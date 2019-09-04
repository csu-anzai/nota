import Dexie from 'dexie';
import { DB_NAME } from './constants';
import version1 from './schemas/version1';

const db = new Dexie(DB_NAME);

db.version(1).stores(version1);

export default db;
