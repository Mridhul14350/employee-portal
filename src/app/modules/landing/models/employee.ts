export interface EmployeeData {
  name: string;
  phone: string;
  email: string;
}

export interface EmployeeTasks {
  id: number;
  title: string;
  completed: boolean;
  status?: string;
}
