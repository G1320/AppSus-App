import NotePreview from './NotePreview.js';
// import { eventBus } from '../../../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';

export default {
  name: 'noteList',
  props: ['notes'],
  template: `
    
        <section class="note-list">
          
                <article  v-for="note in notes"  :style="{backgroundColor: note.style.backgroundColor}" class="keep-note" :key="note.id">
                      <NotePreview :note="note"/>
                      <RouterLink  :to="'/note/'+note.id">Details</RouterLink> |
                      <RouterLink  :to="'/note/edit/'+note.id"> Edit</RouterLink> |
                     <span @click="remove(note.id)" class="material-symbols-outlined">
              close
              </span>
\                </article>
        </section>



    `,
  data() {
    return {
      // notes: [],
      filterBy: {},
    };
  },
  computed: {
    filteredNotes() {
      const regex = new RegExp(this.filterBy.createdAt, 'i');
      return this.notes.filter((note) => regex.test(note.type));
    },
  },
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId).then;
      showSuccessMsg('Email removed');
    },
    showDetails(noteId) {
      this.$emit('show-details', noteId);
    },
    setFilterBy(filterBy) {
      console.log('filterBy: ', filterBy);
      this.filterBy = filterBy;
    },
    save() {
      noteService.save({ ...this.note });
    },
  },
  components: {
    NotePreview,
    noteService,
  },
};
