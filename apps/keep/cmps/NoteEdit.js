import { noteService } from '../services/note.service.js';
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';

export default {
  template: `
        <section class="note-edit">
            <h2>{{(note.id)? 'Edit' : 'Add'}} a note</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="note.info.txt" placeholder="Txt">
                <!-- <input type="number" v-model.number="note.maxSpeed"> -->
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      note: noteService.getEmptyNote(),
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
      eventBus.emit('save', { ...this.note })

    },
  },
};
