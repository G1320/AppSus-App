import NotePreview from './NotePreview.js';
import { eventBus } from '../../../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';

export default {
  name: 'noteList',
  props: ['notes'],
  template: `
        <section class="note-list">
          
                <article  v-for="note in filteredNotes"  :style="{backgroundColor: note.style.backgroundColor}" class="keep-note" :key="note.id">
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
      notes: [],
      filterBy: {
        catagories: 'pinned',
      },
    };
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes));
    eventBus.on('filter', this.setFilterBy);
    eventBus.on('save', this.onSave);
    // this.filterBy
    // console.log(this.setFilterBy);
  },
  computed: {
    filteredNotes() {
      const regex = new RegExp(this.filterBy.title, 'i');
      return this.notes.filter((note) => regex.test(note.title));

      let filteredNotes = this.notes;

      let filterBy = this.filterBy.catagories;

      return filteredNotes.filter((note) => {
        // note.isPinned === true;
      });
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
      this.filterBy = { ...this.filterBy, ...filter, catagories: this.filterBy.catagories };
    },
    // setFilterBy(filterBy) {
    //   console.log('filterBy: ', filterBy);
    //   this.filterBy = filterBy;
    // },
    save() {
      noteService.save({ ...this.note });
    },
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        console.log('', oldValue);
        console.log('', newValue);
        const { catagories } = this.$route.query;
        if (!catagories) return;
        console.log('tab:', catagories);
        this.filterBy.catagories = catagories;
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true,
    },
  },
  components: {
    NotePreview,
    noteService,
  },
};
