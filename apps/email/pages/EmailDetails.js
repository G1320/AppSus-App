import { emailService } from "../services/email.service.js"

export default {
    template: `
        <section class="email-details" v-if="email">
            <h2>{{ email.subject }}</h2>
            <div className="email-info">
                <p>From : {{ email.from }}</p>
                <p>{{emailTime}}</p>
            </div>
            <p>to me</p>
            <p>{{ email.body }}</p>
            <pre>
                {{email}}
            </pre>  
            <nav>
                <RouterLink :to="'/email/' + email.prevEmailId">Previous Email</RouterLink> |
                <RouterLink :to="'/email/' + email.nextEmailId">Next Email</RouterLink>
                <hr />
                <RouterLink to="/email/list">Back to list</RouterLink>
            </nav>
            <hr />
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        const { id } = this.$route.params
        this.loadEmail(id)
        this.readEmail(id)
    },
    computed: {
        emailTime() {
            const date = new Date(this.email.sentAt)
            const hours = date.getHours()
            const minutes = date.getMinutes()
            return `${hours}:${minutes}`
        }
    },
    watch: {
        $route: {
            handler(newValue, oldValue) {
                console.log('', oldValue);
                console.log('', newValue);
                const { id } = this.$route.params
                if (!id) return
                this.loadEmail(id)
                // Note: `newValue` will be equal to `oldValue` here
                // on nested mutations as long as the object itself
                // hasn't been replaced.
            },
            deep: true
        }
    },
    methods: {
        loadEmail(emailId) {
            emailService.get(emailId)
                .then(email => this.email = email)
        },
        readEmail(emailId) {
            emailService.get(emailId)
                .then(email => {
                    this.email = email
                    if (this.email.isRead) return
                    else {
                        this.email.isRead = true
                        // showSuccessMsg('Email read')
                        emailService.save({ ...this.email })

                    }
                })
                .catch(err => {
                    // showErrorMsg('Email remove failed')
                    console.log(err)
                })
        },
    }
}