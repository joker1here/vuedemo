import Vue from 'vue';
import VueRouter from 'vue-router';
import EmployeeView from '../views/EmployeeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/MyLogin.vue'),
  },
  {
    path: '/dept',
    name: 'dept',
    component: () => import( '../views/Dept.vue'),
  },
  {
    path: '/job',
    name: 'job',
    component: () => import( '../views/Job.vue'),
  },
  {
    path: '/work',
    name: 'work',
    component: () => import( '../views/Work.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
