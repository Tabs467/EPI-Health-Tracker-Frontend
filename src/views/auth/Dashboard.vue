<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useAuthStore } from "@/store/auth";

    const auth = useAuthStore();

    onMounted(() => {
        if (auth.user != null && !auth.isLoggedIn) {
            auth.getUser();
        }
    })
</script>
<template>
    <div>
        <h1 class="pb-5">Dashboard</h1>
        <div class="flex flex-col">
            <div>
                <p class="pb-5">Welcome back, {{ auth.user?.name }}</p>
                <p class="pb-5">Email: {{ auth.user?.email }}</p>
            </div>
            <button @click="auth.logout" class="form-field-submit">Logout</button>
        </div>
    </div>
</template>