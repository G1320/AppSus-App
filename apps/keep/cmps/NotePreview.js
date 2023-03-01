export default {
  props: ['note'],
  template: `
          <article class="note-preview">
              <!-- <img :src="note.thumbnail"> -->
            
              <!-- <p>{{ formattedCurrency }}</p> -->
                <h3>title</h3>

              <component @update-info="onUpdate" :is="note.type" :info="note.info" ></component>
          </article>
      `,

  computed: {
    //   formattedCurrency() {
    //     const { amount, currencyCode } = this.note.listPrice;
    //     return Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount);
    //   },
  },
  methods:{
    onUpdate(valueToUpdate){
      console.log('',valueToUpdate);
      
    }
  }
};
