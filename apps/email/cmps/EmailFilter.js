import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="email-filter">
            <input class="search-input"
                v-model="filterBy.subject"
                placeholder="Search mail"
                type="text" />
                <input 
                v-model="filterBy.unread"
                type="checkbox"
                ><span class="range-number">Unread</span>
                
        </section>
    `,
    data() {
        return {
            filterBy: { subject: '', unread: false }
        }
    },
    methods: {
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