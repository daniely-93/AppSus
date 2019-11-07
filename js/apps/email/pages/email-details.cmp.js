import mailService from '../services/mail-service.js';

export default {
    name: 'MailDetails',
    template : `
    <div v-if="mail" class="mail-list-container">
        {{mail.body}}
    </div>`,
    data(){
        return {
            mail: null
        }
    },
    created() {
        this.loadMail();
        
    },
    mounted(){
        console.log(this.mail);
    },
    methods :{
        loadMail(){
            const mailId = this.$route.params.id;
            mailService.getInboxMailById(mailId).then(mail => this.mail = mail);
        }
    },
    watch:{
        '$route.params.id'() {
            this.loadMail();
        }
    }
}