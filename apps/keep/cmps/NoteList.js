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
                     
          <div class="note-preview-icon-wrapper">
          <input @input="save" type="color" v-model="note.style.backgroundColor" value="note.style.backgroundColor">

            <RouterLink  :to="'/note/'+note.id">Details</RouterLink> 
             <!-- <RouterLink  :to="'/note/edit/'+note.id"> Edit</RouterLink>  -->
            <span @click="remove(note.id)" class="material-symbols-outlined">
              close
            </span>
          </div>
            </article>
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
    setFilterBy(filter) {
      console.log('setFilter', filter);
      this.filterBy = { ...this.filterBy, ...filter, catagories: this.filterBy.tab };
    },
    // setFilterBy(filterBy) {
    //   console.log('filterBy: ', filterBy);
    //   this.filterBy = filterBy;
    // },
    save() {
      noteService.save({ ...this.note });
    },
  },
  components: {
    NotePreview,
    noteService,
  },
};
