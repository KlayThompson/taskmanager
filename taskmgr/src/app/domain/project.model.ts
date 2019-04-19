export interface ProjectModel {
  id?: string;
  name: string;
  desc: string;
  coverImg: string;
  taskLists: string[]; // 存储taskList id
  members: string[];
}

