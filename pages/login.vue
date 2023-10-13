<template>
  <div>
    <HeaderTitle />

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
      :loading="loginLoading"
    >
      登录
    </NButton>
  </div>
</template>

<script setup>
import { supabase } from "../utils/supabase.js";

const message = useMessage();

const email = ref(null);
const password = ref(null);

const loginLoading = ref(false);

async function login() {
  if (!email || !password) return;

  loginLoading.value = true;

  const loginResult = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  console.log("登录结果: ", loginResult);

  // success
  if (loginResult.error == null) {
    message.success("登录成功, 欢迎回来, " + loginResult.data.user.email);
  } else {
    message.error("登录失败: " + loginResult.error.message);
  }

  loginLoading.value = false;
}
</script>
