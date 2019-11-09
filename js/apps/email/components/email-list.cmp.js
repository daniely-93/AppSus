import mailPreview from './email-preview.cmp.js';
import utilService from '../../../services/utils-service.js'

export default {
    props: ['mails', 'dir'],
    template: `
    <div class="mail-list-container">
        <div class="mail-item title bg-gray">
            <p class="mail-item-info from">{{directory}}</p>
            <p class="mail-item-info subject">Subject</p>
            <p class="mail-item-info body">Content</p>
            <p class="mail-item-info time">Time</p>
        </div>
        <transition-group v-if="mails" name="fade" tag="div" class="mail-list">
            <mail-preview v-for="mail in mails" :key="mail.id + randomId" :mail="mail"></mail-preview>
        </transition-group >
    </div>`,
    computed: {
        directory() {
            if (this.dir === 'inbox' || this.dir === 'trash') return 'From';
            return 'To';
        },
        randomId(){
            return utilService.getRandomId(3);
        }
    },
    components: {
        mailPreview
    }
}