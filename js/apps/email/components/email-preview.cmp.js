export default {
    props: ['mail'],
    template: `
    <div v-if="mail" class="mail-item" @click="openDetails" :class="{bold : !mail.isRead}">
        <p class="mail-item-info from">{{senderName}}</p>
        <p class="mail-item-info subject">{{mail.subject}}</p>
        <p class="mail-item-info body">{{mail.body}}</p>
        <p class="mail-item-info date">{{timeAsDate}}</p>
    </div>`,
    methods: {
        openDetails() {
            this.$router.push(`/mail/${this.mail.id}`)
        }
    },
    computed: {
        timeAsDate() {
            return new Date(this.mail.sentAt).toLocaleTimeString();
        },
        senderName() {
            return this.mail.from ? this.mail.from.substring(0, this.mail.from.indexOf('@')) : 
                   this.mail.to.substring(0, this.mail.to.indexOf('@'));
        }
    }
}