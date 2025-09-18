<template>
  <div id="app" class="container-fluid py-4">
    <div class="row mb-3">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center p-3 bg-white rounded shadow-sm">
          <h1 class="h3 mb-0 text-primary">
            <i class="bi bi-person-badge me-2"></i>Управление учетными записями
          </h1>
          <button class="btn btn-primary" @click="handleAddAccount">
            Добавить учетную запись
          </button>
        </div>
      </div>
    </div>

    <div v-if="accounts.length === 0" class="row">
      <div class="col-12">
        <div class="text-center p-5 bg-white rounded shadow-sm">
          <i class="bi bi-inbox display-1 text-muted mb-3"></i>
          <h3 class="text-muted">Нет учетных записей</h3>
          <p class="text-muted">Нажмите кнопку "Добавить первую запись" чтобы добавить первую учетную запись</p>
          <button class="btn btn-primary mt-3" @click="handleAddAccount">
            Добавить первую запись
          </button>
        </div>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-12">
        <AccountItem
          v-for="account in accounts"
          :key="account.id"
          :account="account"
          @remove="handleRemoveAccount"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="p-3 bg-light rounded">
          <small class="text-muted">
            <i class="bi bi-info-circle me-1"></i>
            Всего учетных записей: {{ accounts.length }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAccountStore } from './stores/accountStore';
import AccountItem from './components/AccountItem.vue';

const accountStore = useAccountStore();

const accounts = computed(() => accountStore.accounts);

const handleAddAccount = () => {
  accountStore.addAccount();
};

const handleRemoveAccount = (id: string) => {
  accountStore.removeAccount(id);
};
</script>

<style>
body {
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  min-height: 100vh;
}

.text-primary {
  color: #002070 !important;
}

.btn-primary {
  background-color: #002070;
  border-color: #002070;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.bg-white {
  background-color: #fff !important;
}
</style>