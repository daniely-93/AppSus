export default {
    template: `
    <header class="header">
        <h1>AppSus</h1>
        <nav class="nav-container">
            <div class="nav-menu">
                <button @click="toggleMenu">+</button>
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