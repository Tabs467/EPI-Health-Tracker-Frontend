import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import Profile from '../views/auth/Profile.vue'
import Dashboard from '../views/Dashboard.vue'
import Log from '../views/Log.vue'
import LogFood from '../views/LogFood.vue'
import LogSymptom from '../views/LogSymptom.vue'
import Calendar from '../views/Calendar.vue'
import Search from '../views/Search.vue'
import ErrorCode from '../views/ErrorCode.vue'
import { useAuthStore } from '@/store/auth'
import { useTrackableItemStore } from '@/store/trackable_item'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/log',
      name: 'log',
      component: Log,
      meta: { requiresAuth: true },
    },
    {
      path: '/log-food',
      name: 'log-food',
      component: LogFood,
      meta: { requiresAuth: true },
    },
    {
      path: '/log-symptom',
      name: 'log-symptom',
      component: LogSymptom,
      meta: { requiresAuth: true },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/error/:code',
      name: 'error-code',
      component: ErrorCode,
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.isLoggedIn) {
    window.scrollTo(0, 0);
    next({name: "login"});
  }
  else if (to.matched.some((record) => record.meta.requiresGuest) && auth.isLoggedIn) {
    window.scrollTo(0, 0);
    next({name: "dashboard"});
  }
  else {
    window.scrollTo(0, 0);
    next();
  }
});

router.afterEach((to, from, next) => {
  if (from.name === 'log-food' || from.name === 'log-symptom') {
    const trackableItem = useTrackableItemStore();
    trackableItem.cleanState();
  }
});

export default router;
