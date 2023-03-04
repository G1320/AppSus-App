import { noteService } from '../services/note.service.js';

import noteFilter from '../cmps/NoteFilter.js';
import noteList from '../cmps/NoteList.js';

import noteDetails from './noteDetails.js';
// import noteEdit from './noteEdit.js';

export default {
  name: 'noteDetails',
  template: `
    <main class="keep-main-content">
    <div class="keep-filter-list">
      <p>I AM A REMINDER</p>
      <p>I AM A EDIT LABEL</p>
      <p>I AM A ARCHIVE</p>
      <p>I AM A TRASH</p>

  </div>
        <section class="note-index">
        <RouterView></RouterView>
<!-- <div class=" note-filter-input-container"> -->
  
  <noteFilter @filter="setFilterBy"/>
  <!-- <RouterLink @click="save" :to="'/note/edit/'+note.id"> Edit</RouterLink> | -->
<!-- </div> -->
  <noteList 
  :notes="filteredNotes" 
  v-if="notes"
  @remove="removeNote" 
  @show-details="showNoteDetails" />
  <!-- <noteEdit @note-saved="onSaveNote"/> -->
          <!-- <RouterView></RouterView> -->

         
        </section>
        </main>

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
    save() {
      noteService.save({ ...this.note });
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
