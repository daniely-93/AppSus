export default {
    name: 'MailDetails',
    template : `<div v-if="mail">{{mail}}</div>`,
    data(){
        return {
            mail: null
        }
    },
    methods :{
        loadMail(){

        }
    },
    watch:{
        '$route.params.id'() {
            this.loadMail();
        }
    }
}