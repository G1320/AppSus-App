export default {
  name: 'NoteTxt',
  props: ['info'],
  // emits: ['update-info'],
  template: `
  <div   >
 <!-- :style="{backgroundColor: info.style.backgroundColor}" -->
    
    <h1 contentEditable="true">{{ info.txt }}</h1>
  </div>
          `,
  components: {},
  created() {
    console.log(this.info);
  },
  data() {
    return {
      styleObject: {
        // backgroundColor: this.style,
        fontSize: '13px',
      },
    };
  },
  methods: {},
  computed: {},
};
