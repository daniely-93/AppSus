import SideMenu from '../components/side-menu.cmp.js'

export default {
    name: 'Main',
    template: `
    <div class="mail-container">
        <SideMenu/>

    </div>
    `,
    components: {
        SideMenu,
    }
}