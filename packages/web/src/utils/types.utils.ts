
interface User {
  username: string;
  email: string;
  avatar: string;
  password: string
}

export interface GetUsersResponse {
  getUsers: User[];
}
