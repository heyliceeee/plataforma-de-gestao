import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Users from '../views/Users.vue';
import Products from '../views/Products.vue';
import Reports from '../views/Reports.vue';
import Login from '../views/Login.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/users', component: Users },
    { path: '/products', component: Products },
    { path: '/reports', component: Reports },
    { path: '/login', component: Login }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;