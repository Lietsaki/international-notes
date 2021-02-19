import Dexie from 'dexie';
import { Note } from '../models/Note';

// 1) Define our database
const db = new Dexie('notesDB');

// 2) Create a 'notes' table/collection
db.version(1).stores({
  notes: 'id++, title, content'
});

// 3) Open the DB
db.open();

// 4) Map the DB to our Note model
// This will make each result from the notes collection an intance of the Note model, and hence we
// can access its properties there.
db.notes.mapToClass(Note);

export default db;
