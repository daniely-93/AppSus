export default {
    name: 'Home',
    template: `
    <transition name="slide-fade">
    <div v-if="true" class="homepage">
        <h1>Welcome to AppSus</h1>
        <img src="img/homepage.png"> 
        <h2>We have everything you need...</h2>
        <div class="nav-buttons">
            <router-link to="/mail"><i class="fa fa-envelope"></i> Mail</router-link>
            <router-link to="/notes"><i class="fa fa-thumbtack"></i> Notes</router-link>
        </div>
    </div></transition>`
}