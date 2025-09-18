export interface AccountLabel {
  text: string;
}

export interface Account {
  id: string;
  labels: AccountLabel[];
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
  errors?: {
    login?: string;
    password?: string;
  };
}

export type AccountType = 'LDAP' | 'Локальная';