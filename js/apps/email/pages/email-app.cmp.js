import mailService from '../services/mail-service.js';
import sideMenu from '../components/side-menu.cmp.js';
import emailList from '../components/email-list.cmp.js';

export default {
    name: 'Main',
    template: `
    <div class="mail-container">
        <sideMenu @clicked="changeDir"/>
        <emailList :mails="mails" :dir="dir"/>
    </div>
    `,
    data() {
        return {
            mails : [],
            dir: 'inbox',
            showForm: false
        }
    },
    methods : {
        loadMails(){
           mailService.getDir(this.dir).then(mails => this.mails = mails)
            .catch(err => console.log(err))
        },
        changeDir(dir){
            this.dir = dir;
            this.loadMails();
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