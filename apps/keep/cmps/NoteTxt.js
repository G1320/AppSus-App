export default {
  name: 'NoteTxt',
  props: ['info'],
  emits: ['update-info'],
  template: `
    <!-- <h1>IM THE BEST NOTE TXT EVER</h1> -->
    <h1>{{ info.txt }}</h1>
          `,
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
