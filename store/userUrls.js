import { defineStore } from "pinia";

// pinia store
export const useUserUrlsStore = defineStore('userUrls', {
  state: () => ({
    state: {
      isLoading: true,
      isError: "",
    },
    userID: null,
    urls: [],
  }),
  actions: {
    async getUserID() {
      const { data, error } = await supabase.auth.getUser();
      this.userID = data?.user?.id ?? null;
    },
    async fetchData() {
      if (!this.userID) {
        this.state.isError = "未登录, 无法获取短链历史";
        return;
      }

      let fetchResult = await supabase
        .from("short_urls")
        .select("*")
        .eq("owner", this.userID)
        .eq("removed", false);

      this.urls = fetchResult?.data ?? [];
      this.state.isError = fetchResult?.error?.message ?? "";

      console.log("Fetch short_urls by this user:", fetchResult);
    },
    async deleteURL(id) {
      const deleteResult = await supabase
        .from("short_urls")
        .update({ removed: true })
        .eq("id", id);

      (async () => {
        this.state.isLoading = true;
        await this.fetchData();
        this.state.isLoading = false;
      })();

      console.log(deleteResult);
      return deleteResult;
    }
  }
})