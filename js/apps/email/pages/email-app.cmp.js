import mailService from '../services/mail-service.js';
import sideMenu from '../components/side-menu.cmp.js';
import emailList from '../components/email-list.cmp.js';
import emailCompose from '../components/email-compose.cmp.js'
import { eventBus } from './../../../services/eventbus-service.js';

export default {
    name: 'Main',
    template: `
    <div class="mail-container" v-if="mails">
        <side-menu @clicked="changeDir" @toggleForm="toggleForm" :unread="unreadMails"></side-menu>
        <router-view :mails="filteredMails" :dir="dir"></router-view>
        <transition name="fade">
            <email-compose v-if="showForm" @sendMail="sendMail" :mailTemplate="mailTemplate"></email-compose>
        </transition>
    </div>
    `,
    data() {
        return {
            mails: [],
            filteredMails: [],
            searchStr: '',
            filterStr: 'all',
            dir: 'inbox',
            showForm: false,
            mailTemplate: null
        }
    },
    methods: {
        loadMails() {
            mailService.getDir(this.dir).then(mails => {
                this.mails = mails;
                this.filteredMails = mails;
            }).catch(err => console.log(err))
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
            this.searchStr = str;
            this.filteredMails = this.searchedMails;
        });
        eventBus.$on('filter', filterBy => {
            this.filterStr = filterBy;
            this.filteredMails = this.searchedMails;
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
            if(!this.mails.length) return 0;
            return this.mails.filter(mail => !mail.isRead).length
        },
        searchedMails() {
            if (!this.searchStr && this.filter === 'all') return this.mails;
            const search = this.searchStr.toLowerCase();
            let currMails = this.mails.filter(mail => {
                return mail.subject.toLowerCase().includes(search) ||
                    mail.to.toLowerCase().includes(search) ||
                    mail.from.toLowerCase().includes(search) ||
                    mail.body.toLowerCase().includes(search)
            })
            return this.filterStr !== 'all' ? currMails.filter(mail => String(mail.isRead) === this.filterStr) : currMails;
        },
    },
    components: {
        sideMenu,
        emailList,
        emailCompose
    }
}