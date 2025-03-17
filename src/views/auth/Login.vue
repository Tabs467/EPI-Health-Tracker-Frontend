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
    <div>
        <h1 class="pb-5">Login</h1>
        <form class="max-w-sm mx-auto" novalidate @submit.prevent="handleSubmit()">
            <div class="mb-5 bottom-5 pb-3">
                <label for="email" class="form-field-textbox-label">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-field-textbox" placeholder="johndoe@email.com" />
                <template v-if="errors.email">
                    <span class="text-red-500 text-xs italic">
                        {{ errors.email }}
                    </span>
                </template>
                <template v-if="errors.api">
                    <span class="text-red-500 text-xs italic">
                        {{ errors.api }}
                    </span>
                </template>
            </div>
            <div class="mb-5 bottom-5 pb-3">
                <label for="password" class="form-field-textbox-label">Password</label>
                <input type="password" id="password" v-model="form.password" class="form-field-textbox" />
                <template v-if="errors.password">
                    <span class="text-red-500 text-xs italic">
                        {{ errors.password }}
                    </span>
                </template>
            </div>
            <button type="submit" class="form-field-submit">Login</button>
        </form>
    </div>
</template>