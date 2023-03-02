export default {
    props: ['email'],
    template: `
        <article class="email-preview">
            <p class="unread-p" v-if="!email.isRead">Unread</p>
            <p>{{ email.from }}</p>
            <p class="email-subject">{{ email.subject }}</p>
        </article>
    `,
}