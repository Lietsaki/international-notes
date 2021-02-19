<template>
  <q-page>
    <div v-for="note in notes" :key="note.id">
      <q-card class="my-card bg-blue-grey-9 text-white q-ma-lg">
        <q-card-section>
          <div class="text-h6">{{ note.title }}</div>
        </q-card-section>

        <q-card-section>{{ note.content }} </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn flat :to="`/edit/${note.id}`">{{ $t('index.edit') }}</q-btn>
          <q-btn @click="deleteNote(note)" flat>{{ $t('index.delete') }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" to="/add" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { NotesDAO } from '../db/NotesDAO';

export default {
  name: 'PageIndex',
  data() {
    return {
      notes: []
    };
  },
  methods: {
    deleteNote(noteId) {
      NotesDAO.getInstance()
        .delete(noteId)
        .then(() => {
          this.$q.notify(this.$t('index.deleted'));
        });

      // Refresh the notes array so the user can see the deleted note has disappeared
      this.getNotes();
    },
    getNotes() {
      // Get all notes
      NotesDAO.getInstance()
        .get()
        .then(res => {
          this.notes = res;
        });
    }
  },
  mounted() {
    this.getNotes();
  }
};
</script>
