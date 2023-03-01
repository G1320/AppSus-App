import notePreview from './notePreview.js';

export default {
  props: ['notes'],
  template: `
    <main class="keep-main-content">
    <div class="keep-filter-list">
      <p>I AM A NOTE</p>
      <p>I AM A REMINDER</p>
      <p>I AM A EDIT LABEL</p>
      <p>I AM A ARCHIVE</p>
      <p>I AM A TRASH</p>

  </div>
        <section class="note-list">
        <div class="keep-add-note">
                <AddReview  @save-review="saveReview"/>

        <!-- <p>
          i AM Component add note
        </p> -->
            <ul>
                <li v-for="note in notes" :key="note.id">
                <notePreview :note="note"/>
                    <RouterLink :to="'/note/'+note.id">Details</RouterLink> |
                    <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> |
                    <button hidden @click="showDetails(note.id)">Details</button>
                    <button @click="remove(note.id)">x</button>
                </li>
            </ul>
        </section>



</main>
    `,
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    showDetails(noteId) {
      this.$emit('show-details', noteId);
    },
  },
  components: {
    notePreview,
  },
};
