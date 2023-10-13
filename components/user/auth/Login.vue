<template>
  <div>
    <NForm>
      <NFormItemRow label="邮箱">
        <n-input placeholder="邮箱" v-model:value="email" />
      </NFormItemRow>
      <NFormItemRow label="密码">
        <n-input placeholder="密码" type="password" v-model:value="password" />
      </NFormItemRow>
    </NForm>
    <NButton
      type="primary"
      @click="login"
      block
      secondary
      strong
      :loading="store.state.isLoginLoading"
    >
      登录
    </NButton>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth.js";

const store = useAuthStore();

const message = useMessage();

const email = ref(null);
const password = ref(null);

async function login() {
  const loginResult = await store.login(email.value, password.value);

  console.log("登录结果: ", loginResult);

  // display message
  if (loginResult.error == null) {
    message.success("登录成功, 欢迎回来, " + loginResult.data?.user?.email);
  } else {
    message.error("登录失败: " + loginResult.error.message);
  }
}
</script>
