export interface TaskModel {
  id?: string;
  desc: string;
  completed: boolean;
  dueDate?: Date;
  reminder?: Date;
  priority: number;
  createDate?: Date;
  ownerId: string;
  participantIds: string[]; // 参与者ID数组
}

