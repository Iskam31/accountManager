import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Account, AccountLabel } from '../types/account';

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);

  const loadFromStorage = () => {
    const stored = localStorage.getItem('accounts');
    if (stored) {
      accounts.value = JSON.parse(stored);
    }
  };

  const saveToStorage = () => {
    const validAccounts = accounts.value.filter(account => 
      validateAccount(account, false)
    );
    localStorage.setItem('accounts', JSON.stringify(validAccounts));
  };

  const addAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString(),
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
      errors: {}
    };
    accounts.value.push(newAccount);
  };

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter(account => account.id !== id);
  };

  const updateAccount = (id: string, updates: Partial<Account>) => {
    const index = accounts.value.findIndex(account => account.id === id);
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updates };
    }
  };

  const validateAccount = (account: Account, updateErrors: boolean = true): boolean => {
    const errors: { login?: string; password?: string } = {};
    
    if (!account.login.trim()) {
      errors.login = 'Логин обязателен для заполнения';
    } else if (account.login.length > 100) {
      errors.login = 'Логин не должен превышать 100 символов';
    }

    if (account.type === 'Локальная') {
      if (!account.password) {
        errors.password = 'Пароль обязателен для локальной учетной записи';
      } else if (account.password.length > 100) {
        errors.password = 'Пароль не должен превышать 100 символов';
      }
    }

    if (updateErrors) {
      updateAccount(account.id, { errors });
    }
    
    return Object.keys(errors).length === 0;
  };

  const validateAllAccounts = (): boolean => {
    let allValid = true;
    accounts.value.forEach(account => {
      if (!validateAccount(account)) {
        allValid = false;
      }
    });
    return allValid;
  };

  const saveValidAccounts = () => {
    accounts.value = accounts.value.filter(account => validateAccount(account, false));
    saveToStorage();
  };

  const parseLabels = (labelsString: string): AccountLabel[] => {
    if (!labelsString.trim()) return [];
    
    return labelsString.split(';')
      .map(label => label.trim())
      .filter(label => label.length > 0 && label.length <= 50)
      .map(label => ({ text: label }));
  };

  const formatLabels = (labels: AccountLabel[]): string => {
    return labels.map(label => label.text).join('; ');
  };

  watch(accounts, (newAccounts) => {
    const validAccounts = newAccounts.filter(account => 
      validateAccount(account, false)
    );
    
    if (JSON.stringify(validAccounts) !== JSON.stringify(JSON.parse(localStorage.getItem('accounts') || '[]'))) {
      localStorage.setItem('accounts', JSON.stringify(validAccounts));
    }
  }, { deep: true });

  loadFromStorage();

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
    validateAccount,
    validateAllAccounts,
    saveValidAccounts,
    parseLabels,
    formatLabels
  };
});