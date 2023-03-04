import { eventBus } from '../../../services/event-bus.service.js';

export default {
  name: '',
  props: [],
  template: `
    <div className="categories-container">
        <button @click ="filterByTab('trash')">Inbox</button>
        <button @click ="filterByTab('archive')">Starred</button>
        <!-- <button @click ="filterByTab('sent')">Sent</button>
        <button @click ="filterByTab('draft')">Draft</button>
        <button @click ="filterByTab('trash')">Trash</button> -->
        </div>
        `,
  components: {},
  created() {},
  data() {
    return {
      categories: { categories: '' },
    };
  },
  methods: {
    filterByTab(categories) {
      this.$router.push({ path: '/email/list', query: { categories } });
      this.categories.subcategories = categories;
      console.log('this.categories', this.categories);
    },
  },
  computed: {},
};
