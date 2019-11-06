export default {
    template: `
    <div class="side-menu">
        <button class="btn-compose">Compose</button>
        <ul class="side-menu-list">
            <li class="side-menu-item" @click="onClick('inbox')">Inbox</li>
            <li class="side-menu-item" @click="onClick('sents')">Sent</li>
            <li class="side-menu-item" @click="onClick('drafts')">Drafts</li>
            <li class="side-menu-item" @click="onClick('trash')">Trash</li>
        </ul>
    </div>`,
    methods : {
        onClick(dir){
            this.$emit('clicked', dir)
        }
    }
}