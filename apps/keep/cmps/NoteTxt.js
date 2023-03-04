import { noteService } from '../services/note.service.js';

export default {
  name: 'NoteTxt',
  props: ['note'],
  // emits: ['update-info'],
  template: ` 

  <input :style="{backgroundColor: note.style.backgroundColor}" @input="save"  class="note-preview-title" v-model="note.info.title" contentEditable="true" placeholder="info.title ">
  <input :style="{backgroundColor: note.style.backgroundColor}" @input="save"  class="note-preview-txt" v-model="note.info.txt" contentEditable="true" placeholder="info.txt ">
    
          `,
  components: {},
  created() {
    // console.log(this.info);
  },
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
