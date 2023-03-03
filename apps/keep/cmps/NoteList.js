import NotePreview from './NotePreview.js';

export default {
  props: ['notes'],
  template: `
    
        <section class="note-list">
        <div class="keep-add-note">
                <!-- <AddReview  @save-review="saveReview"/> -->
</div>
        <!-- <p>
          i AM Component add note
        </p> -->
            <article>
                <div v-for="note in notes" :key="note.id">
                    <pre>is pinned: {{ note.isPinned }}</pre>
                    <pre>created at: {{ note.createdAt }}</pre>
                    <NotePreview :note="note"/>
                    <RouterLink :to="'/note/'+note.id">Details</RouterLink> |
                    <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> |
                    <button hidden @click="showDetails(note.id)">Details</button>
                    <button @click="remove(note.id)">x</button>
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
    // filteredNotes() {
    //   const regex = new RegExp(this.filterBy.subject, 'i');
    //   return this.notes.filter((nate) => regex.test(note.type));
    // },
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
  },
  components: {
    NotePreview,
  },
};
