export default {
    props: ['unread'],
    template: `
    <div class="side-menu">
        <button class="button btn-compose" @click="toggleForm"><i class="fa fa-pencil-alt"></i> Compose</button>
        <ul class="side-menu-list">
            <li :class="{active : active === 'inbox' ,  bold : unread && active === 'inbox' }" class="side-menu-item" @click="onDirClick('inbox')"><i class="fa fa-inbox"></i> <p class="side-menu-title">Inbox <span v-if="unread && active === 'inbox'">({{ unread }})</span></p></li>
            <li :class="{active : active === 'sent' ,  bold : unread && active === 'sent' }" class="side-menu-item" @click="onDirClick('sent')"><i class="fa fa-paper-plane"></i> <p class="side-menu-title">Sent <span v-if="unread && active === 'sent'">({{ unread }})</span></p></li>
            <li :class="{active : active === 'starred' ,  bold : unread && active === 'starred' }" class="side-menu-item" @click="onDirClick('starred')"><i class="fa fa-star"></i > <p class="side-menu-title">Starred <span v-if="unread && active === 'starred'">({{ unread }})</span></p></li>
            <li :class="{active : active === 'drafts' ,  bold : unread && active === 'draft' }" class="side-menu-item" @click="onDirClick('drafts')"><i class="fa fa-sticky-note"></i> <p class="side-menu-title">Drafts <span v-if="unread && active === 'drafts'">({{ unread }})</span></p></li>
            <li :class="{active : active === 'trash' ,  bold : unread && active === 'trash' }" class="side-menu-item" @click="onDirClick('trash')"><i class="fa fa-trash"></i> <p class="side-menu-title">Trash <span v-if="unread && active === 'trash'">({{ unread }})</span></p></li>
        </ul>
    </div>`,
    data() {
        return {
            active: 'inbox'
        }
    },
    methods: {
        onDirClick(dir) {
            this.active = dir;
            this.$emit('clicked', dir)
        },
        toggleForm() {
            this.$emit('toggleForm');
        }
    },
}