export default {
  name: 'NoteImg',
  props: ['info'],
  emits: ['update-info'],
  template: `

<!-- <h1>IM THE BEST NOTE TXT EVER</h1> -->
<h1>{{ info.title }}</h1>
<img :src="info.url">

          `,
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
