<template>
  <div>
    <NThing>
      <template #header>当前用户信息</template>
      <template #description>{{ email }}</template>
      <template #footer>
        <NSpace>
          <NButton size="small" secondary @click="signOut">登出</NButton>
        </NSpace>
      </template>
    </NThing>
  </div>
</template>
<script setup>
const email = ref("获取中...");
const message = useMessage();

onMounted(async () => {
  let userData = await supabase.auth.getUser();
  if (userData.error == null) {
    email.value = userData.data?.user?.email;
  } else if (userData.error.status === 401) {
    email.value = "未登录";
  } else {
    email.value = "获取失败";
  }
});

async function signOut() {
  let result = await supabase.auth.signOut();
  if (result.error == null) {
    message.info("登出成功");
  }
}
</script>
