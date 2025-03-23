<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from './store/auth';
  import { onMounted } from 'vue'; 
  import 'vue-toast-notification/dist/theme-sugar.css';

  const auth = useAuthStore();

  onMounted(() => {
      document.title = "EPI Health Tracker";
      if (auth.user != null && !auth.isLoggedIn) {
          auth.getUser();
      }
  })
</script>
<template>
  <div>
    <header v-if="auth.isLoggedIn" class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3">
        <nav class="flex space-x-4">
          <RouterLink to="/dashboard" class="nav-link" active-class="active-link">Dashboard</RouterLink>
          <RouterLink to="/log" class="nav-link" active-class="active-link">Log</RouterLink>
          <RouterLink to="/calendar" class="nav-link" active-class="active-link">Calendar</RouterLink>
          <RouterLink to="/search" class="nav-link" active-class="active-link">Search</RouterLink>
          <RouterLink to="/profile" class="nav-link" active-class="active-link">Profile</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>