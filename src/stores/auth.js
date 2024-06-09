import { defineStore } from 'pinia';
import { auth } from '@/plugins/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: localStorage.getItem('isLoggedIn') ?? false,
        user: null,
        error: null
    }),
    actions: {
        async register(email, password) {
            try {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                this.user = response.user;
                this.error = null;
                this.isLoggedIn = true;
                return Promise.resolve(response);
            } catch (error) {
                this.error = error.message;
                return Promise.resolve(error);
            }
        },
        async login(email, password) {
            try {
                const response = await signInWithEmailAndPassword(auth, email, password);
                this.user = response.user;
                this.error = null;
                return Promise.resolve(response);
            } catch (error) {
                this.error = error.message;
                return Promise.resolve(error);
            }
        },
        async logout() {
            try {
                await signOut(auth);
                this.user = null;
                this.error = null;
                this.isLoggedIn = false;
            } catch (error) {
                this.error = error.message;
                return Promise.resolve(error);
            }
        }
    }
});