<template>
  <div class="account-form">
    <div class="header">
      <h2>Управление учетными записями</h2>
      <el-button
        type="primary"
      >
        + Добавить учетную запись
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.account-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header h2 {
  margin: 0;
  color: #303133;
}
</style>