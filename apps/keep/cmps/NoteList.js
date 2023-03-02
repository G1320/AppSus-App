import notePreview from './notePreview.js';

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
                <notePreview :note="note"/>
                    <RouterLink :to="'/note/'+note.id">Details</RouterLink> |
                    <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> |
                    <button hidden @click="showDetails(note.id)">Details</button>
                    <button @click="remove(note.id)">x</button>
                </div>
            </article>
        </section>



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
