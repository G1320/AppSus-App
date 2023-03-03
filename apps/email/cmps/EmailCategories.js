import { eventBus } from "../../../services/event-bus.service.js";

export default {
    name: '',
    props: [],
    template: `
    <div className="categories-container">
        <button @click ="filterByTab('inbox')">Inbox</button>
        <button @click ="filterByTab('starred')">Starred</button>
        <button @click ="filterByTab('sent')">Sent</button>
        <button @click ="filterByTab('draft')">Draft</button>
        <button @click ="filterByTab('trash')">Trash</button>
        </div>
        `,
    components: {},
    created() { },
    data() {
        return {
            categories: { tab: '' }
        }
    },
    methods: {
        filterByTab(tab) {
            this.$router.push({ path: '/email/list', query: { tab } });
            this.categories.tab = tab
            console.log('this.categories', this.categories)
        }
    },
    computed: {},
}
