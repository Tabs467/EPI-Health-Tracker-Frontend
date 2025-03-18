<script setup lang="ts">
    import { useAuthStore } from "@/store/auth";

    const auth = useAuthStore();
</script>
<template>
    <main class="main-container">
        <div class="main-card">
            <h1 class="main-title">Profile</h1>
            <p class="main-text">
                Welcome back, <span class="text-semi-bold">{{ auth.user?.name }}</span>
            </p>
            <p class="main-text">Email: {{ auth.user?.email }}</p>
            <button @click="auth.logout" class="auth-button logout-button cursor-pointer">Logout</button>
        </div>
    </main>
</template>  