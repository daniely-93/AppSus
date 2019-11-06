export default {
    template: `
    <div class="side-menu">
        <button class="button btn-compose" @click="toggleForm"><i class="fa fa-pencil-alt"></i> Compose</button>
        <ul class="side-menu-list">
            <li :class="{active : active === 'inbox'}" class="side-menu-item" @click="onDirClick('inbox')"><i class="fa fa-inbox" aria-hidden="true"></i> Inbox</li>
            <li :class="{active : active === 'sents'}" class="side-menu-item" @click="onDirClick('sents')"><i class="fa fa-paper-plane" aria-hidden="true"></i> Sent</li>
            <li :class="{active : active === 'drafts'}" class="side-menu-item" @click="onDirClick('drafts')"><i class="fa fa-sticky-note"></i> Drafts</li>
            <li :class="{active : active === 'trash'}" class="side-menu-item" @click="onDirClick('trash')"><i class="fa fa-trash" aria-hidden="true"></i> Trash</li>
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