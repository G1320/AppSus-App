import { eventBus } from '../../../services/event-bus.service.js';

export default {
  name: 'noteCatagories',
  props: [],
  template: `
    <!-- <div className="keep-note-categories-container">
        <button @click ="filterByTab('createdAt')">createdAt</button>
        <button @click ="filterByTab('pinned')">Pinned</button> -->
        <!-- <button @click ="filterByTab('sent')">Sent</button>
        <button @click ="filterByTab('draft')">Draft</button>
        <button @click ="filterByTab('trash')">Trash</button> -->
        <!-- </div> -->

        <div class="keep-filter-list">
      <p>
        <span class="icon material-symbols-outlined">
          lightbulb
        </span>
         Notes
      </p>
      <p>
      <span class="icon material-symbols-outlined">
          edit
          </span>
         Edit labels
      </p>  
      
      <p @click ="filterByTab('pinned')">
        <span class="icon material-symbols-outlined">
          notifications
        </span>
        Reminder
    </p>
      <p @click ="filterByTab('createdAt')">
      <span class="icon material-symbols-outlined">
system_update_alt
</span>
      Archive</p>
      <p>
      <span class="icon material-symbols-outlined">
delete
</span>
       Trash</p>

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
      this.$router.push({ query: { categories } });
      this.categories.subcategories = categories;
      console.log('this.categories', this.categories);
    },
  },
  computed: {},
};
