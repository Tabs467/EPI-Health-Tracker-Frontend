import { defineStore } from "pinia";
import type { LoginForm, User } from "@/types";
import { ref } from "vue";
import axiosInstance, { handleAPIErrors } from "@/lib/axios";
import type { RegisterForm } from "@/types";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => 
    {
        const user = ref<User | null>(null);
        const isLoggedIn = ref<boolean>(false);

        const register = async (data: RegisterForm) => {
            await axiosInstance.get("/sanctum/csrf-cookie", {
                baseURL: "http://localhost:8000",
            });
            try {
                await axiosInstance.post('/register', data);
                await getUser();
                router.push('/dashboard');
            } catch (e) {
                return handleAPIErrors(e);
            }
        };

        const login = async (data: LoginForm) => {
            await axiosInstance.get("/sanctum/csrf-cookie", {
                baseURL: "http://localhost:8000",
            });
            try {
                await axiosInstance.post('/login', data);
                await getUser();
                router.push('/dashboard');
            } catch (e) {
                return handleAPIErrors(e);
            }
        };

        const getUser = async () => {
            if (isLoggedIn.value) {
                return;
            }
            try {
                const response = await axiosInstance.get('/user');
                user.value = response.data;
                isLoggedIn.value = true;
            } catch (error) {
                console.error(error);
            }
        }

        const cleanState = () => {
            user.value = null;
            isLoggedIn.value = false;
        };

        const logout = async () => {
            try {
                await axiosInstance.post('/logout');
                cleanState();
                router.push('/');
            } catch (error) {
                console.error(error);
            }
        };

        return {
            user,
            isLoggedIn,
            register,
            login,
            getUser,
            logout,
            cleanState,
        };
    }, 
    {
        persist: {
            storage: sessionStorage,
            pick: ['user', 'isLoggedIn'],
        },
    }
);