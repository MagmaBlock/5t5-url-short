import { defineStore } from "pinia";
import { supabase } from "~/utils/supabase.js";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    state: {
      isLoginLoading: false,
      isFetchingUserData: true,
    },
    userData: null,
  }),
  actions: {
    async fetchUserData() {
      this.state.isFetchingUserData = true;

      let userData = await supabase.auth.getUser();
      if (userData.data) {
        this.userData = userData.data.user;
      }

      this.state.isFetchingUserData = false;
    },
    async login(email, password) {
      if (!email || !password) return;

      this.state.isLoginLoading = true;
      this.state.isFetchingUserData = true;

      const loginResult = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (loginResult.error == null) {
        this.userData = loginResult.data.user;
      }

      this.state.isLoginLoading = false;
      this.state.isFetchingUserData = false;

      return loginResult;
    },
    async signOut() {
      this.state.isFetchingUserData = true;

      let result = await supabase.auth.signOut();
      if (result.error == null) {
        this.userData = null;

        this.state.isFetchingUserData = false;
        return result;
      }

      this.state.isFetchingUserData = false;
    }
  }
})