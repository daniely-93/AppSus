import mailService from '../services/mail-service.js';
import sideMenu from '../components/side-menu.cmp.js';
import emailList from '../components/email-list.cmp.js';
import emailCompose from '../components/email-compose.cmp.js'
import { eventBus } from './../../../services/eventbus-service.js';

export default {
    name: 'Main',
    template: `
    <div class="mail-container">
        <sideMenu @clicked="changeDir" @toggleForm="toggleForm"/>
        <router-view :mails="mails"></router-view>
        <emailCompose v-if="showForm" @sendMail="sendMail"/>
    </div>
    `,
    data() {
        return {
            mails: [],
            dir: 'inbox',
            showForm: false,
        }
    },
    methods: {
        loadMails() {
            mailService.getDir(this.dir).then(mails => this.mails = mails).catch(err => console.log(err))
        },
        changeDir(dir) {
            this.dir = dir;
            this.loadMails();
            this.$router.push;
        },
        toggleForm() {
            this.showForm = !this.showForm;
        },
        sendMail(formInput) {
            if (!formInput.to || formInput.to.indexOf('@') < 3) return;
            formInput.sentAt = Date.now();
            mailService.sendMail(formInput).then(mail => {
                if (mail) this.toggleForm();
            })
        },
        saveMail() {
            mailService.saveMail(this.formInput);
        },
    },
    created() {
        this.loadMails();
        eventBus.$on('deleteMail', id => {
            mailService.deleteMail(this.dir, id).then(() => {
                // do something
            })
        });
        eventBus.$on('recoverMail', id => {
            mailService.recoverMail(id).then(() => {

            })
        });
    },
    components: {
        sideMenu,
        emailList,
        emailCompose
    },
}