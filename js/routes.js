import Home from './pages/home.cmp.js'


const routes = [
    {
        path: '/',
        component: Home
    }
]

const router = new VueRouter({ routes })

export default router;