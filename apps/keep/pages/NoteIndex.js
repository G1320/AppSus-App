import { noteService } from '../services/note.service.js';

import noteFilter from '../cmps/NoteFilter.js';
import noteList from '../cmps/NoteList.js';

import noteDetails from './noteDetails.js';
// import noteEdit from './noteEdit.js';

export default {
  template: `
        <section class="note-index">
        <RouterLink to="/note/edit">Edit a note</RouterLink>

            <noteFilter @filter="setFilterBy"/>
            <noteList 
                :notes="filteredNotes" 
                v-if="notes"
                @remove="removeNote" 
                @show-details="showNoteDetails" />
            <!-- <noteEdit @note-saved="onSaveNote"/> -->
            <noteDetails 
                v-if="selectedNote" 
                @hide-details="selectedNote = null"
                :note="selectedNote"/>
        </section>
    `,
  data() {
    return {
      notes: null,
      selectedNote: null,
      filterBy: {},
    };
  },
  methods: {
    removeNote(noteId) {
      noteService.remove(noteId).then(() => {
        const idx = this.notes.findIndex((note) => note.id === noteId);
        this.notes.splice(idx, 1);
      });
    },
    showNoteDetails(noteId) {
      this.selectedNote = this.notes.find((note) => note.id === noteId);
    },
    onSaveNote(newNote) {
      this.notes.unshift(newNote);
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    filteredNotes() {
      const regex = new RegExp(this.filterBy.vendor, 'i');
      return this.notes.filter((note) => regex.test(note.title));
    },
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes));
  },
  components: {
    noteFilter,
    noteList,
    noteDetails,
    // noteEdit,
  },
};
