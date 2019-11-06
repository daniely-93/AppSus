export default {
    template: `
    <header class="header">
        <h1>AppSus</h1>
        <nav class="nav-container">
            <div class="nav-menu">
                <button class="menu-select-btn" @click="toggleMenu"><i class="fa fa-ellipsis-h"></i><i class="fa fa-ellipsis-h"></i><i class="fa fa-ellipsis-h"></i></button>
            </div>
            <div class="menu" v-if="showMenu">
                <ul class="menu-list">
                    <li class="menu-btn" @click="toggleMenu"><router-link to="/mail"><i class="fa fa-inbox"></i> Mail</router-link></li>
                    <li class="menu-btn" @click="toggleMenu"><router-link to="/notes"><i class="fa fa-sticky-note"></i> Notes</router-link></li>
                    <li class="menu-btn" @click="toggleMenu"><router-link to="/books"><i class="fa fa-book"></i> Books</router-link></li>
                </ul>
            </div>
        </nav>
    </header>`,
    data(){
        return {
            showMenu: false
        }
    },
    methods: {
        toggleMenu(){
            this.showMenu = !this.showMenu;
        }
    },
}