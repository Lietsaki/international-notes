<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <q-form @submit="save" class="q-ma-xl">
          <h4 v-if="id" class="q-mb-lg">{{ $t('editor.editNote') }}</h4>
          <h4 v-else class="q-mb-lg">{{ $t('editor.createNote') }}</h4>
          <q-input
            outlined
            v-model="note.title"
            :label="$t('editor.title')"
            class="q-mb-lg"
            :rules="[val => !!val || $t('editor.titleValidation')]"
          />
          <q-input
            v-model="note.content"
            filled
            type="textarea"
            :label="$t('editor.content')"
          />
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn type="submit" fab icon="done" color="primary" />
          </q-page-sticky>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { NotesDAO } from '../db/NotesDAO';
import { Note } from '../models/Note';

export default {
  name: 'Editor',
  props: {
    id: {
      type: Number,
      required: false
    }
  },

  data() {
    return {
      note: new Note()
    };
  },
  methods: {
    save() {
      NotesDAO.getInstance()
        .save(this.note)
        .then(() => {
          if (this.id) {
            this.$q.notify(this.$t('editor.edited'));
          } else {
            this.$q.notify(this.$t('editor.saved'));
          }
          // Go back to the homepage
          window.history.back();
        });
    }
  },
  mounted() {
    // If the id prop exists, get the note and set it as the current note.
    // This will be used when we want to edit a note.
    if (this.id) {
      this.note = NotesDAO.getInstance()
        .getById(this.id)
        .then(foundNote => {
          this.note = foundNote;
        });
    }
  }
};
</script>
