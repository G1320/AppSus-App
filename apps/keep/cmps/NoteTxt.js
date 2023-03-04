import { noteService } from '../services/note.service.js';

export default {
  name: 'NoteTxt',
  props: ['note'],
  // emits: ['update-info'],
  template: ` 
  <input @blur="save"  class="note-preview-title" v-model="note.info.title" contentEditable="true" placeholder="info.title ">
  <input @blur="save"  class="note-preview-txt" v-model="note.info.txt" contentEditable="true" placeholder="info.txt ">
    <input @change="save" type="color" v-model="note.style.backgroundColor" value="note.style.backgroundColor">

    
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
