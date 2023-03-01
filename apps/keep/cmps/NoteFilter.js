export default {
  template: `
          <section class="note-filter">
              <input 
                  v-model="filterBy.title"
                  @input="filter" 
                  placeholder="Search"
                  type="text" />
          </section>
      `,
  data() {
    return {
      filterBy: { title: '', pageCount: 0 },
    };
  },
  methods: {
    filter() {
      this.$emit('filter', this.filterBy);
    },
  },
};
