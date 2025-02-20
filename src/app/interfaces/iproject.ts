export interface IProject {
  id?: number;
  name: string;
  description: string;
  start: string;
  end: string;
  status: string;
  estimatedHours: number;
  workedHours: number;
}
