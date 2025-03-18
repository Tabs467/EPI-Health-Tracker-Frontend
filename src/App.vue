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
        <RouterLink to="/">Home</RouterLink>
        <template v-if="auth.isLoggedIn">
          <RouterLink to="/profile">Profile</RouterLink>
        </template>
        <template v-if="!auth.isLoggedIn">
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </template>
      </nav>
    </div>
  </header>

  <RouterView />
</template>