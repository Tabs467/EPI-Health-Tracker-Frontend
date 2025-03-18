<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from './store/auth';
  import { onMounted } from 'vue';

  const auth = useAuthStore();

  onMounted(() => {
      if (auth.user != null && !auth.isLoggedIn) {
          auth.getUser();
      }
  })
</script>

<template>
  <header>
    <div>
      <nav>
        <template v-if="auth.isLoggedIn">
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink to="/log">Log</RouterLink>
          <RouterLink to="/calendar">Calendar</RouterLink>
          <RouterLink to="/search">Search</RouterLink>
          <RouterLink to="/profile">Profile</RouterLink>
        </template>
        <template v-if="!auth.isLoggedIn">
          <RouterLink to="/">Home</RouterLink>
        </template>
      </nav>
    </div>
  </header>

  <RouterView />
</template>