export type UserRoleProps = {
  sub: number;
  role: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager';
};
