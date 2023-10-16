<template>
  <div>
    <NSpin :show="store.state.isFetchingUserData">
      <NThing>
        <template #header>当前用户信息</template>
        <template #description>
          {{ store.userData?.email ?? "未登录" }}
        </template>
        <template #footer>
          <NSpace>
            <NButton size="small" secondary @click="handleSignOut"
              >登出</NButton
            >
          </NSpace>
        </template>
      </NThing>
    </NSpin>
  </div>
</template>
<script setup>
import { useAuthStore } from "~/store/auth.js";

const message = useMessage();
const store = useAuthStore();

onMounted(() => {
  store.fetchUserData();
});

async function handleSignOut() {
  let result = await store.signOut();
  if (!result.error) message.info("登出成功");
}
</script>
