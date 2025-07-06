// db.js
import Dexie from 'dexie';

export const db = new Dexie('Trainalysedb');
db.version(1).stores({
  exercises: '++id, name'
});

