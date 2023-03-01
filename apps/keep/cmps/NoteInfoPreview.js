export default {
  props: ['noteInfo'],
  template: `
          <article class="note-info-preview">
            <h3>{{ noteInfo.name }}</h3>
            <!-- <p class="stars">{{ makeStars }}</p> -->
            <!-- <p class="date">Read At: {{ noteInfo.readAt }}</p> -->
        </article>
        `,

  data() {
    return {};
  },
  created() {
    console.log(this.noteInfo);
  },
  methods: {},
  computed: {
    makeStars() {
      // return '★'.repeat(+this.noteInfo.rate);
    },
  },
};
