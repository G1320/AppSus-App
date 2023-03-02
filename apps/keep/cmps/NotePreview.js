import NoteTxt from './NoteTxt.js';
import NoteImg from './NoteImg.js';

export default {
  props: ['note'],
  template: `
          <article class="keep-note-preview">
              <component   :is="note.type" :info="note.info" > </component>
              <!-- @update-info="onUpdate" -->
          </article>
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
