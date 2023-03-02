import { noteService } from '../services/note.service.js';
import LongTxt from '../cmps/LongTxt.js';

// import AddNote from '../cmps/AddNote.js';
export default {
  template: `

        <section v-if="note" class="note-details">
          <img :src="note.thumbnail">
          <h1>Hello</h1>
          <pre>{{ note }} </pre>
          <img :src="note.info.url">

          <h2>{{ note.id }}</h2>
          <h2>{{ note.type }}</h2>
          <h2>{{ note.isPinned }}</h2>
            <!-- <LongTxt :txt="note.description"/> -->
            <!-- <p><strong>Authors:</strong> {{ note.authors.join(', ') }}</p> -->
            <!-- <p><strong>Categories:</strong> {{ note.categories.join(', ') }}</p> -->
            <!-- <p><strong>Language:</strong> {{ note.language }}</p> -->
            <!-- <nav> -->
            <RouterLink :to="'/note/' + note.prevNoteId">Previous Note</RouterLink> |
                <RouterLink :to="'/note/' + note.nextNoteId">Next Note</RouterLink>
                <hr />
                <RouterLink to="/note">Back to list</RouterLink>
            <!-- </nav> -->


        </section>
        
    `,
  data() {
    return {
      styleObject: {
        backgroundColor: 'purple',
        fontSize: '13px',
      },
      note: null,
    };
  },
  created() {
    const { noteId } = this.$route.params;
    console.log('Params:', this.$route.params);
    this.loadNote(noteId);
  },
  // computed: {
  //   noteId() {
  //     return this.$route.params.noteId;
  //   },
  // },
  watch: {
    noteId() {
      this.loadNote();
    },
  },
  methods: {
    loadNote(id) {
      noteService.get(id).then((note) => (this.note = note));
    },
  },
  components: {
    LongTxt,
    // AddNote,
  },
};
