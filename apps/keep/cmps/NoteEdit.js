import { noteService } from '../services/note.service.js';
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';

export default {
  name: 'noteEdit',
  template: `
        <section :style="{backgroundColor: note.style.backgroundColor}" class="note-edit keep-modal">
            <h2> Add a note</h2>  
            <form @submit.prevent="save">
            <input  type="text" v-model="note.info.title" contentEditable="true">
            <input  type="text" v-model="note.info.txt" placeholder="Txt">
            <input  type="color" v-model="note.style.backgroundColor" value="note.style.backgroundColor">

         
<button @click="save">
<span class="material-symbols-outlined">
save
</span>
</button>
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
