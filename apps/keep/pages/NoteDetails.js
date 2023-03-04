import { noteService } from '../services/note.service.js';

export default {
  name: 'noteDetails',
  template: `

<section v-if="note" :style="{backgroundColor: note.style.backgroundColor}" class="note-details keep-modal">
  <img v-if="note.info.url" :src="note.info.url">
          <h2 v-if="note.isPinned" @click="note.isPinned = !note.isPinned "   class="pinned-indication"> I'm pinned!</h2>

          <textarea @blur="save" class="note-details-title" v-model="note.info.title" contentEditable="true">
            </textarea>
          <textarea @blur="save" class="note-detail-text-area" type="text" v-model="note.info.txt" placeholder="Txt">
            </textarea>
          <input @change="save" type="color" v-model="note.style.backgroundColor" value="note.style.backgroundColor">
          <RouterLink to="/note">
            <span class="material-symbols-outlined">
              close
              </span>
            </RouterLink>
        </section>
        
    `,
  data() {
    return {
      note: null,
    };
  },
  created() {
    const { noteId } = this.$route.params;
    console.log('noteId: ', noteId);
    console.log('Params:', this.$route.params);
    this.loadNote(noteId);
  },
  watch: {
    noteId() {
      this.loadNote();
    },
  },
  methods: {
    loadNote(id) {
      noteService.get(id).then((note) => (this.note = note));
    },
    save() {
      noteService.save({ ...this.note });
    },
  },
  components: {},
};
