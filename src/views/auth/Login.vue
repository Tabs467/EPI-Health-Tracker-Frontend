<script setup lang="ts">
    import { reactive } from "vue";
    import type { LoginForm } from "@/types";
    import { useAuthStore } from "@/store/auth";

    const auth = useAuthStore();

    const form = reactive<LoginForm>({
        email: "",
        password: "",
    });

    const errors = reactive({
        api: "",
        email: "",
        password: "",
    });

    const validateForm = () => {
        let isValid = true;

        errors.api = "";
        errors.email = "";
        errors.password = "";

        if (!form.email) {
            errors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = "Invalid email format.";
            isValid = false;
        }

        if (!form.password) {
            errors.password = "Password is required.";
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            // If not redirected to dashboard from auth.login success, display the api error message
            errors.api = await auth.login(form);
        }
    };
</script>
<template>
    <main class="auth-container">
        <div class="auth-card">
            <h1 class="auth-title">Login</h1>
            <form class="auth-form" novalidate @submit.prevent="handleSubmit()">
                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" v-model="form.email" class="form-input" placeholder="johndoe@email.com" />
                    <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
                    <span v-if="errors.api" class="form-error">{{ errors.api }}</span>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" v-model="form.password" class="form-input" />
                    <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
                </div>

                <button type="submit" class="auth-button cursor-pointer">Login</button>
                <RouterLink to="/" class="auth-button secondary">Return</RouterLink>
            </form>
        </div>
    </main>
</template>