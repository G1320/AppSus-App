import { noteService } from '../services/note.service.js';
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';

export default {
  name: 'noteEdit',
  template: `
        <section :style="{backgroundColor: note.style.backgroundColor}" class="note-edit keep-modal">
            <h2>{{(note.id)? 'Edit' : 'Add'}} a note</h2>
            <!-- <pre>{{ note }}</pre> -->
            <img v-if="note.type === 'NoteImg'" :src="note.info.url">
            <input  type="text" v-model="note.info.title" contentEditable="true">
             <input type="text" v-model="note.info.imgTitle" contentEditable="true"> 
             <!-- <input  type="text" v-model="note.info.txt" placeholder="Txt"> -->
             <form @submit.prevent="save">
                <!-- <input type="number" v-model.number="note.maxSpeed"> -->
                <!-- <button>Save</button> -->

              </form>
              <RouterLink to="/note">
          <span class="material-symbols-outlined">
         close
        </span>
        </RouterLink>
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
      eventBus.emit('save', { ...this.note });
    },
  },
};
