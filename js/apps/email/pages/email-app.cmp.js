import mailService from '../services/mail-service.js';
import sideMenu from '../components/side-menu.cmp.js';
import emailList from '../components/email-list.cmp.js';

export default {
    name: 'Main',
    template: `
    <div class="mail-container">
        <sideMenu @clicked="changeDir" @toggleForm="toggleForm"/>
        <router-view :mails="mails"></router-view>
        <div v-if="showForm" class="form-send">
            <div class="form-title">
                <h3>New Message</h3>
            </div>
            <div class="form-content">
                <div class="input-group">
                    <span>To:</span>
                    <input type="email" v-model="formInput.to" />
                </div>
                <div class="input-group">
                    <span>Cc:</span>
                    <input type="text" v-model="formInput.cc" />
                </div>
                <div class="input-group">
                    <span>Bcc:</span>
                    <input type="text" v-model="formInput.bcc" />
                </div>
                <div class="input-group">
                    <span>Subject:</span>
                    <input type="text" v-model="formInput.subject" />
                </div>
                <textarea type="text" v-model="formInput.body" />
            </div>
            <div class="form-buttons">
                <button class="button" @click="sendMail">Send</button>
                <button class="btn-trash" @click="resetFormData"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            mails: [],
            dir: 'inbox',
            showForm: false,
            formInput: {
                to: '',
                cc: '',
                bcc: '',
                subject: '',
                body: ''
            }
        }
    },
    loadMails() {
        mailService.getDir(this.dir).then(mails => this.mails = mails)
            .catch(err => console.log(err))
    },
    resetFormData() {
        this.formInput = {
            to: '',
            cc: '',
            bcc: '',
            subject: '',
            body: ''
        };
        this.toggleForm();
    },
    changeDir(dir) {
        this.dir = dir;
        this.loadMails();
        this.$router.push('/mail');
    },
    toggleForm() {
        this.showForm = !this.showForm;
    },
    sendMail() {
        if (!this.formInput.to || this.formInput.to.indexOf('@') < 3) return;
        this.formInput.sentAt = Date.now();
        mailService.sendMail(this.formInput).then(mail => {
            if (mail) this.resetFormData();
        })
    },
    saveMail() {
        mailService.saveMail(this.formInput);
    },
},
created() {
    this.loadMails();
},
components: {
    sideMenu,
        emailList
},
watch: {
    'formInput': () => console.log('asd')
}
}