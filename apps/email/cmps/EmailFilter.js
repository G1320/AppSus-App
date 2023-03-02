import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="email-filter">
            <input 
                v-model="filterBy.subject"
                placeholder="Search"
                type="text" />
                
        </section>
    `,
    data() {
        return {
            filterBy: { subject: '' },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    },
    watch: {
        filterBy: {
            handler() {
                console.log('filterBy changed', this.filterBy)
                eventBus.emit('filter', { ...this.filterBy })
            },
            deep: true
        },
        'filterBy.subject'() {
            console.log('filterBy SUBJECT changed', this.filterBy)
            this.$emit('filter', this.filterBy)
        },
    }

}