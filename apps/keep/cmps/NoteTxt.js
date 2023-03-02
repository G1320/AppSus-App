export default {
  name: 'NoteTxt',
  props: ['info'],
  emits: ['update-info'],
  template: `
  <div :class="note-txt" :style="styleObject" >

    <!-- <img :src="info.url"> -->
    
    <!-- <h1>IM THE BEST NOTE TXT EVER</h1> -->
    <h1 contentEditable="true">{{ info.txt }}</h1>
  </div>
          `,
  components: {},
  created() {},
  data() {
    return {
      styleObject: {
        backgroundColor: 'pink',
        fontSize: '13px',
      },
    };
  },
  methods: {},
  computed: {},
};
