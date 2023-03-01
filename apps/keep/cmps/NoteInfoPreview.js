export default {
  props: ['review'],
  template: `
          <article class="review-preview">
            <h3>{{ review.name }}</h3>
            <p class="stars">{{ makeStars }}</p>
            <p class="date">Read At: {{ review.readAt }}</p>
        </article>
        `,

  data() {
    return {};
  },
  created() {
    console.log(this.review);
  },
  methods: {},
  computed: {
    makeStars() {
      return '★'.repeat(+this.review.rate);
    },
  },
};
