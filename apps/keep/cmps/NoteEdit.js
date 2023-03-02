import { noteService } from '../services/note.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export default {
  template: `
        <section class="note-edit">
            <h2>Add a note</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="note.title" placeholder="Title">
                <input type="number" v-model.number="note.listPrice.amount">
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      // note: noteService.getEmptyNote(),
    };
  },
  created() {
    const { noteId } = this.$route.params;
    if (noteId) {
      noteService.get(noteId).then((note) => (this.note = note));
    }
  },
  methods: {
    save() {
      noteService
        .save(this.note)
        .then((savedNote) => {
          showSuccessMsg('Note saved');
          this.$router.push('/note');
        })
        .catch((err) => {
          showErrorMsg('Note save failed');
        });
    },
  },
};
