import mailService from '../services/mail-service.js';
import sideMenu from '../components/side-menu.cmp.js';
import emailList from '../components/email-list.cmp.js';
import emailCompose from '../components/email-compose.cmp.js'
import { eventBus } from './../../../services/eventbus-service.js';

export default {
    name: 'Main',
    template: `
    <div class="mail-container">
        <side-menu @clicked="changeDir" @toggleForm="toggleForm" :unread="unreadMails"></side-menu>
        <router-view :mails="filteredMails.length ? filteredMails : mails" :dir="dir"></router-view>
        <transition name="fade">
            <email-compose v-if="showForm" @sendMail="sendMail" :mailTemplate="mailTemplate"></email-compose>
        </transition>
    </div>
    `,
    data() {
        return {
            mails: [],
            filteredMails: [],
            dir: 'inbox',
            showForm: false,
            mailTemplate: null
        }
    },
    methods: {
        loadMails() {
            mailService.getDir(this.dir).then(mails => this.mails = mails).catch(err => console.log(err))
        },
        changeDir(dir) {
            this.dir = dir;
            this.loadMails();

            this.$router.history.current.path === '/mail' ? this.$router.push : this.$router.push('/mail');
        },
        toggleForm() {
            this.showForm = !this.showForm;
        },
        sendMail(formInput) {
            if (!formInput.to || formInput.to.indexOf('@') < 3) return;
            formInput.sentAt = Date.now();
            mailService.sendMail(formInput).then(mail => {
                if (mail) this.toggleForm();
                
                const msg = {
                    txt: `Email successfully sent.`,
                    type: 'success',
                }
                eventBus.$emit('show-msg', msg);
            })
        },
        saveMail() {
            mailService.saveMail(this.formInput);
        },
        search(str) {
            if (!str) return [];
            return this.mails.filter(mail => {
                return mail.subject.toLowerCase().includes(str.toLowerCase()) ||
                    mail.to.toLowerCase().includes(str.toLowerCase()) ||
                    mail.from.toLowerCase().includes(str.toLowerCase()) ||
                    mail.body.toLowerCase().includes(str.toLowerCase())
            })
        },
        filter(value) {
            if (value === 'all') return this.mails;
            return this.mails.filter(mail => String(mail.isRead) === value)
        }
    },
    created() {
        this.loadMails();
        eventBus.$on('deleteMail', id => {
            mailService.deleteMail(this.dir, id).then(() => {
                this.$router.history.current.path === '/mail' ? this.$router.push : this.$router.push('/mail');

                const msg = {
                    txt: `Email successfully deleted.`,
                    type: 'success'
                }
                eventBus.$emit('show-msg', msg);
            })
        });
        eventBus.$on('recoverMail', id => {
            mailService.recoverMail(id).then(() => {
                this.changeDir('trash');
                const msg = {
                    txt: `Email successfully restored.`,
                    type: 'success',
                }
                eventBus.$emit('show-msg', msg);
            })
        });
        eventBus.$on('replyMail', mail => {
            this.mailTemplate = mail;
            if (this.showForm) setTimeout(() => this.toggleForm(), 100);
            this.toggleForm();
        });
        eventBus.$on('search', str => {
            this.filteredMails = this.search(str);
            if (str && !this.filteredMails.length) this.filteredMails.push(null)
        });
        eventBus.$on('filter', filterBy => {
            this.filteredMails = this.filter(filterBy);
            if (filterBy !== 'all' && !this.filteredMails.length) {
                this.filteredMails.push(null)
            }
        });
        eventBus.$on('toggleCompose', () => {
            this.toggleForm();
        });
        eventBus.$on('toggleStar', id => {
            mailService.toggleStar(id).then(() => console.log('starred'))
            const msg = {
                txt: `Email successfully starred.`,
                type: 'success',
            }
            eventBus.$emit('show-msg', msg);
        })
    },
    computed: {
        unreadMails() {
            if (!this.mails) return 0;
            return this.filter('false').length;
        },
    },
    components: {
        sideMenu,
        emailList,
        emailCompose
    },
}