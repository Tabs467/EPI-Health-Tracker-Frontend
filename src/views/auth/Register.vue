<script setup lang="ts">
    import { reactive } from "vue";
    import type { RegisterForm } from "@/types";
    import { useAuthStore } from "@/store/auth";

    const auth = useAuthStore();

    const form = reactive<RegisterForm>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const errors = reactive({
        api: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const validateForm = () => {
        let isValid = true;

        errors.api = "";
        errors.name = "";
        errors.email = "";
        errors.password = "";
        errors.password_confirmation = "";

        if (!form.name) {
            errors.name = "Name is required.";
            isValid = false;
        }

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
        } else if (form.password.length < 8) {
            errors.password = "Password must be at least 8 characters.";
            isValid = false;
        }

        if (form.password !== form.password_confirmation) {
            errors.password_confirmation = "Passwords do not match.";
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            // If not redirected to dashboard from auth.register success, display the api error message
            errors.api = await auth.register(form);
        }
    };
</script>
<template>
    <main class="auth-container">
        <div class="auth-card">
            <h1 class="auth-title">Register</h1>
            <form class="auth-form" novalidate @submit.prevent="handleSubmit()">
                <div class="form-group">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="name" v-model="form.name" class="form-input" placeholder="John Doe" />
                    <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" v-model="form.email" class="form-input" placeholder="johndoe@email.com" />
                    <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" v-model="form.password" class="form-input" />
                    <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
                </div>

                <div class="form-group">
                    <label for="password_confirmation" class="form-label">Confirm Password</label>
                    <input type="password" id="password_confirmation" v-model="form.password_confirmation" class="form-input" />
                    <span v-if="errors.password_confirmation" class="form-error">{{ errors.password_confirmation }}</span>
                </div>

                <button type="submit" class="auth-button">Register</button>
                <span v-if="errors.api" class="form-error api-error">{{ errors.api }}</span>
                <RouterLink to="/" class="auth-button secondary">Return</RouterLink>
            </form>
        </div>
    </main>
</template>  