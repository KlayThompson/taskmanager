export interface User {
  id?: number;
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  projectIds?: string[];
  taskIds?: string[];
  // address?: Address;
  dateOfBirth?: string;
  // identity?: Identity;
}
