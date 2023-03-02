import { emailService } from '../services/email.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export default {
    template: `
        <section class="email-edit">
            <p class="new-email-p">New Email</p>
            <form @submit.prevent="save">
                <input class="email-add-input" type="text" v-model="email.to" placeholder="Recipient">
                <input class="email-add-input" type="text" v-model="email.subject" placeholder="Subject">
                <input class="email-add-input" type="text" v-model="email.body" placeholder="Message">
                <button>Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            email: emailService.getEmptyEmail()
        }
    },
    created() {
        const { emailId } = this.$route.params
        if (emailId) {
            emailService.get(emailId)
                .then(email => this.email = email)
        }
    },
    methods: {
        save() {
            eventBus.emit('save', { ...this.email })
        }
    }
}