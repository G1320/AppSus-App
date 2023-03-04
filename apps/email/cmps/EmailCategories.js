import { eventBus } from "../../../services/event-bus.service.js";

export default {
    name: '',
    props: [],
    template: `
    <div className="categories-container">
        <button @click ="filterByTab('inbox')"> 
            <span class="material-symbols-outlined">
            inbox</span> 
            Inbox</button>
        <button @click ="filterByTab('starred')">
        <span class="material-symbols-outlined">
        star
        </span>
        Starred</button>
        <button @click ="filterByTab('sent')"><span class="material-symbols-outlined">
        send
        </span>
        Sent</button>
        <button @click ="filterByTab('draft')">
        <span class="material-symbols-outlined">
        draft
        </span>
        Draft</button>
        <button @click ="filterByTab('trash')">
        <span class="material-symbols-outlined">
        delete
        </span>
        Trash</button>
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
