import { defineStore } from "pinia";
import { supabase } from "~/utils/supabase.js";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    state: {
      isLoginLoading: false,
    },
    userData: null,
  }),
  actions: {
    async login(email, password) {
      if (!email || !password) return;

      this.state.isLoginLoading = true;

      const loginResult = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (loginResult.error == null) {
        this.userData = loginResult.data.user;
      }

      this.state.isLoginLoading = false;

      return loginResult;
    }
  }
})