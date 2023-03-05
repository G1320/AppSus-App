import { noteService } from '../services/note.service.js';

export default {
  name: 'NoteDetails',
  template: `

<section v-if="note" :style="{backgroundColor: note.style.backgroundColor}" class="note-details keep-modal">
  <img v-if="note.info.url" :src="note.info.url">
          <h2 v-if="note.isPinned" @click="note.isPinned = !note.isPinned "   class="pinned-indication"> I'm pinned!</h2>

          <textarea :style="{backgroundColor: note.style.backgroundColor}" @input="save"  class="note-preview-title" v-model="note.info.title" contentEditable="true" value="note.info.txt">
            </textarea>
            <textarea v-if="note.info.txt" :style="{backgroundColor: note.style.backgroundColor}" @input="save"  class="note-preview-text" v-model="note.info.txt" contentEditable="true" placeholder="note.info.txt">
              </textarea>
            <textarea v-else :style="{backgroundColor: note.style.backgroundColor}" @input="save"  class="note-preview-text" v-model="note.info.imgTitle" contentEditable="true" placeholder="note.info.imgTitle">
              </textarea>
              <div class="note-detail-icon-wrapper">

                <input @change="save" type="color" v-model="note.style.backgroundColor" value="note.style.backgroundColor">
                <RouterLink @click="save"  to="/note">
                  <span class="material-symbols-outlined">
                    close
                  </span>
                </RouterLink>
              </div>
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
  components: {
    noteService,
  },
};
