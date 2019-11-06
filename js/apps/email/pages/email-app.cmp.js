import mailService from '../services/mail-service.js';
import sideMenu from '../components/side-menu.cmp.js';
import emailList from '../components/email-list.cmp.js';

export default {
    name: 'Main',
    template: `
    <div class="mail-container">
        <sideMenu/>
        <emailList :mails="mails"/>
    </div>
    `,
    data() {
        return {
            mails : []
        }
    },
    methods : {
        loadMails(){
            mailService.getMails().then(res => this.mails = res);
        }
    },
    created() {
        this.loadMails();
    },
    components: {
        sideMenu,
        emailList
    }
}