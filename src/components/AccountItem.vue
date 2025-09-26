<template>
    <div class="account-item card mb-3" :class="{ 'border-danger': hasErrors }">
        <div
            class="card-header d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">
                Учетная запись #{{ account.id.slice(-4) }}
            </h5>
            <button class="btn btn-danger btn-sm" @click="handleRemove">
                <i class="bi bi-x-lg"></i> Удалить
            </button>
        </div>

        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Метка</label>
                <input
                    v-model="labelsString"
                    placeholder="метка1; метка2; метка3"
                    maxlength="50"
                    @blur="handleLabelsBlur"
                    class="form-control"
                />
                <div class="form-text">
                    Максимум 50 символов, разделитель - ;
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label">Тип записи <span class="text-danger">*</span></label>
                <select
                    v-model="account.type"
                    @change="handleTypeChange"
                    class="form-select"
                >
                    <option value="LDAP">LDAP</option>
                    <option value="Локальная">Локальная</option>
                </select>
            </div>

            <div class="mb-3" :class="{ 'has-error': account.errors?.login }">
                <label class="form-label">Логин <span class="text-danger">*</span></label>
                <input
                    v-model="account.login"
                    placeholder="Введите логин"
                    maxlength="100"
                    @blur="validate"
                    class="form-control"
                    :class="{ 'is-invalid': account.errors?.login }"
                />
                <div v-if="account.errors?.login" class="invalid-feedback">
                    {{ account.errors.login }}
                </div>
            </div>

            <div 
                v-if="account.type === 'Локальная'"
                class="mb-3"
                :class="{ 'has-error': account.errors?.password }"
            >
                <label class="form-label">Пароль <span class="text-danger">*</span></label>
                <div class="input-group">
                    <input
                        v-model="account.password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Введите пароль"
                        maxlength="100"
                        @blur="validate"
                        class="form-control"
                        :class="{ 'is-invalid': account.errors?.password }"
                    />
                    <button
                        class="btn btn-outline-secondary password-toggle"
                        type="button"
                        @click="showPassword = !showPassword"
                        :title="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
                    >
                        <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                    </button>
                </div>
                <div v-if="account.errors?.password" class="invalid-feedback">
                    {{ account.errors.password }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Account } from "../types/account";
import { useAccountStore } from "../stores/accountStore";

interface Props {
    account: Account;
}

interface Emits {
    (e: "remove", id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const accountStore = useAccountStore();

const labelsString = ref("");
const showPassword = ref(false);


watch(
    () => props.account.labels,
    (newLabels) => {
        labelsString.value = accountStore.formatLabels(newLabels);
    },
    { immediate: true }
);

const handleLabelsBlur = () => {
    const labels = accountStore.parseLabels(labelsString.value);
    accountStore.updateAccount(props.account.id, { labels });
    validate();
};

const handleTypeChange = () => {
    if (props.account.type === "LDAP") {
        accountStore.updateAccount(props.account.id, { password: null });
    } else if (
        props.account.type === "Локальная" &&
        props.account.password === null
    ) {
        accountStore.updateAccount(props.account.id, { password: "" });
    }
    validate();
};

const validate = () => {
    accountStore.validateAccount(props.account);
};

const handleRemove = () => {
    emit("remove", props.account.id);
};

const hasErrors = computed(() => {
    return props.account.errors && Object.keys(props.account.errors).length > 0;
});
</script>

<style scoped>
.account-item {
    transition: all 0.3s ease;
}

.account-item:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}

.form-text {
    font-size: 0.875rem;
    color: #6c757d;
}

.has-error {
    border-left: 3px solid #dc3545;
    padding-left: 10px;
}
.password-toggle {
  transition: all 0.2s ease;
}

.password-toggle:hover {
  background-color: #6c757d;
  color: white;
}

.password-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.25);
}
</style>
