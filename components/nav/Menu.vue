<template>
  <NMenu
    :options="menuOptions"
    v-model:value="selectedKey"
    :collapsed-width="64"
    :collapsed-icon-size="22"
  />
</template>

<script setup>
import {
  HomeOutline as HomeIcon,
  ChatboxOutline as AboutIcon,
  LogInOutline as LoginIcon,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import LinkButton from "./LinkButton.vue";

const selectedKey = computed(() => useRoute().name);

const menuOptions = [
  {
    label: () => h(LinkButton, { to: "/" }, () => "主页"),
    key: "index",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () => h(LinkButton, { to: "/about" }, () => "关于"),
    key: "about",
    icon: renderIcon(AboutIcon),
  },
  {
    label: () => h(LinkButton, { to: "/login" }, () => "登录"),
    key: "login",
    icon: renderIcon(LoginIcon),
  },
];

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
</script>
