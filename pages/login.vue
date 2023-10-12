<template>
  <div>
    <HeaderTitle />

    <NForm>
      <NFormItemRow label="用户名">
        <n-input placeholder="用户名" />
      </NFormItemRow>
      <NFormItemRow label="密码">
        <n-input placeholder="密码" type="password" />
      </NFormItemRow>
    </NForm>
    <NButton type="primary" block secondary strong> 登录 </NButton>
  </div>
</template>
