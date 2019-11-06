import mailPreview from './email-preview.cmp.js';

export default {
    props: ['mails'],
    template: `
    <div class="mail-list-container">
    
        <div class="mail-item title">
            <p class="mail-item-info from">From</p>
            <p class="mail-item-info subject">Subject</p>
            <p class="mail-item-info body">Content</p>
            <p class="mail-item-info time">Time</p>
        </div>
        <div class="mail-list">
            <mailPreview v-for="mail in mails" :mail="mail" />
        </div>
    </div>`,
    components: {
        mailPreview
    }
}