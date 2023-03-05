export default {
  name: 'noteFilter',
  template: `
      <section class="note-filter">
          <input 
              v-model="filterBy.categories"
              placeholder="Filter by title"
              type="text" />
              
          <!-- <input 
              v-model.number="filterBy.maxSpeed"
              placeholder="Max speed"
              type="number" /> -->
      </section>
  `,
  data() {
    return {
      filterBy: { id: 'n' },
    };
  },
  methods: {
    filter() {
      this.$emit('filter', this.filterBy);
    },
  },
  watch: {
    filterBy: {
      handler() {
        console.log('filterBy changed', this.filterBy);
        this.$emit('filter', this.filterBy);
      },
      deep: true,
    },
    'filterBy.id'() {
      console.log('filterBy ID changed', this.filterBy);
      this.$emit('filter', this.filterBy);
    },
  },
};
