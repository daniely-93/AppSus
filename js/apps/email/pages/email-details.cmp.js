import mailService from '../services/mail-service.js';
import { eventBus } from '../../../services/eventbus-service.js';

export default {
    name: 'MailDetails',
    template: `
    <transition name="slide-fade">
    <div v-if="mail" class="mail-list-container">
        <div class="mail-details bg-lightgray p15">
            <div class="mail-details-address">
                <p><span class="bold">{{senderName}}</span> <{{fullSenderName}}></p>
                <p>to me</p>
            </div>
            <p>{{timeAsDate}}</p>
        </div>
        <div class="mail-details-content p15">
            <h2>{{mail.subject}}</h2>
            <p>{{mail.body}}</p>
        </div>
        <div class="action-buttons p15">
            <button style="float: left" @click="$router.push('/mail')"><i class="fa fa-arrow-left"></i></button>
            <button @click="sendEmit('deleteMail')"><i class="fa fa-trash"></i></button>
            <button @click="reply('reply')"><i class="fa fa-reply"></i></button>
            <button @click="reply('forward')"><i class="fa fa-arrow-right"></i></button>
            <button v-if="mail.deletedFrom" @click="sendEmit('recoverMail')"><i class="fa fa-undo"></i></button>
        </div>
    </div>
    </transition>`,
    data() {
        return {
            mail: null
        }
    },
    created() {
        this.loadMail();
    },
    methods: {
        loadMail() {
            const mailId = this.$route.params.id;
            mailService.getMailById(mailId).then(mail => this.mail = mail);
        },
        reply(type) {
            let copyMail = { ...this.mail }
            copyMail.to = copyMail.from;
            if (type === 'forward') copyMail.to = null;
            copyMail.subject = (type === 'forward' ? 'Fw: ' : 'Re: ') + copyMail.subject;
            copyMail.body = `\n\n\n${copyMail.from} Said on ${this.timeAsDate}:\n"${copyMail.body}"`
            eventBus.$emit('replyMail', copyMail);
        },
        sendEmit(emit){
            eventBus.$emit(emit, this.mail.id);
        },
        pinMail(){
            eventBus.$emit('pinMail', this.mail)
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
        randomColor() {
            return utilService.getRandomColor();
        }
    },
    watch: {
        '$route.params.id'() {
            this.loadMail();
        }
    }
}