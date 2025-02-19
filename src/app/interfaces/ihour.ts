export interface IHourOnProject {
  id: number;
  hours: number;
  dateTime: string;
  user: {
    userId: number;
    username: string;
    contract: number;
  };
  project: {
    projectId: number;
    name: string;
    status: string;
  };
}
