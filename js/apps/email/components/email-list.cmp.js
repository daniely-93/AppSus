import mailPreview from './email-preview.cmp.js';

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
        <div class="mail-list" v-if="mails">
            <mail-preview v-for="mail in mails" :mail="mail"></mail-preview>
        </div>
    </div>`,
    computed: {
        directory() {
            if (this.dir === 'inbox' || this.dir === 'trash') return 'From';
            return 'To';
        }
    },
    components: {
        mailPreview
    }
}