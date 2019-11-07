import mailService from '../services/mail-service.js';

export default {
    name: 'MailDetails',
    template : `
    <div v-if="mail" class="mail-list-container">
        <div class="mail-details bg-lightgray">
            <div class="mail-details-address">
                <p><span class="bold">{{senderName}}</span> <{{fullSenderName}}></p>
                <p>to me</p>
            </div>
            <p>{{timeAsDate}}</p>
        </div>
        <div class="mail-details-content">
            <p>{{mail.body}}</p>
        </div>
        <div class="action-buttons">
            <button>+</button>
            <button>+</button>
            <button>+</button>
        </div>
    </div>`,
    data(){
        return {
            mail: null
        }
    },
    created() {
        this.loadMail();
        
    },
    methods :{
        loadMail(){
            const mailId = this.$route.params.id;
            mailService.getInboxMailById(mailId).then(mail => this.mail = mail);
        }
    },
    computed: {
        timeAsDate() {
            return new Date(this.mail.sentAt).toLocaleTimeString();
        },
        senderName() {
            return this.mail.from ? this.mail.from.substring(0, this.mail.from.indexOf('@')) :
                this.mail.to.substring(0, this.mail.to.indexOf('@'));
        },
        shortMessage() {
            return this.mail.body.substring(0, 30) + '...';
        },
        fullSenderName() {
            return this.mail.from ? this.mail.from :
                this.mail.to;
        },
        firstChar() {
            return this.mail.from ? this.mail.from.charAt(0) :
                this.mail.to.charAt(0);
        },
        randomColor(){
            return utilService.getRandomColor();
        }
    },
    watch:{
        '$route.params.id'() {
            this.loadMail();
        }
    }
}