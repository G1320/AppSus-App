import NoteTxt from './NoteTxt.js';
import NoteImg from './NoteImg.js';

export default {
  name: 'notePreview',
  props: ['note'],
  template: `
              <component :is="note.type" :note="note"> </component>
              <!-- @update-info="onUpdate" -->
      `,

  computed: {},
  methods: {
    onUpdate(valueToUpdate) {
      console.log('', valueToUpdate);
    },
  },
  components: {
    NoteTxt,
    NoteImg,
  },
};
