import { noteService } from '../services/note.service.js';

export default {
  name: 'NoteImg',
  props: ['note'],
  emits: ['update-info'],
  template: `
  <img class="note-img" :src="note.info.url">
  
  <input :style="{backgroundColor: note.style.backgroundColor}" @input="save" type="text"  class="note-preview-title" v-model="note.info.title" contentEditable="true" placeholder="note.info.title ">
  <input :style="{backgroundColor: note.style.backgroundColor}" @input="save" type="text"  class="note-preview-txt" v-model="note.info.imgTitle" contentEditable="true" placeholder="note.info.imgTitle ">  
  `,
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {
    save() {
      noteService.save({ ...this.note });
    },
  },
  computed: {},
};
