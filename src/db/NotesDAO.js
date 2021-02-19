import db from './db';

// * NOTE: Make sure to return from the get and save methods, otherwise we'd be
// * unable to chain .then because the promise was not returned.
export class NotesDAO {
  static getInstance() {
    return new NotesDAO();
  }

  get() {
    return db.notes.reverse().toArray();
  }

  save(note) {
    // If the note id already exists, it means we want to update said note.
    if (note.id) {
      return db.notes.update(note.id, note);
    }

    return db.notes.add(note);
  }

  delete(note) {
    return db.notes.delete(note.id);
  }

  getById(noteId) {
    return db.notes.where({ id: noteId }).first();
  }
}
