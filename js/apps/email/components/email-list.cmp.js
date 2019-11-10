import mailPreview from './email-preview.cmp.js';
import utilService from '../../../services/utils-service.js'

export default {
    props: ['mails', 'dir'],
    template: `
    <div class="mail-list-container">
        <div class="mail-item title bg-gray">
            <p class="mail-item-info from" @click="sortBy = 'to'">{{directory}}</p>
            <p class="mail-item-info subject" @click="sortBy = 'subject'">Subject</p>
            <p class="mail-item-info body" @click="sortBy = 'body'">Content</p>
            <p class="mail-item-info date" @click="sortBy = 'sentAt'">Time</p>
        </div>
        <transition-group name="fade" tag="div" class="mail-list">
            <mail-preview v-for="mail in sortedArray" :key="mail.id + randomId" :mail="mail" v-if="mail"></mail-preview>
        </transition-group>
    </div>`,
    data() {
        return {
            sortBy: 'sentAt'
        }
    },
    computed: {
        directory() {
            if (this.dir === 'inbox' || this.dir === 'trash' || this.dir === 'starred') return 'From';
            return 'To';
        },
        randomId() {
            return utilService.getRandomId(3);
        },
        sortedArray() {
            return this.mails.sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? -1 : ((b[this.sortBy] > a[this.sortBy]) ? 1 : 0));
        }
    },
    components: {
        mailPreview
    }
}