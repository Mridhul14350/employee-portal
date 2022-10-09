import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeData, EmployeeTasks } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';

@Component({
  templateUrl: './employee-task-listing.component.html',
  styleUrls: ['./employee-task-listing.component.scss'],
})
export class EmployeeTaskListingComponent implements OnInit {
  employeeTasks = new MatTableDataSource<EmployeeTasks>([]);
  employeeTasksFullData = Array<EmployeeTasks>();
  displayedColumns = ['title', 'completed'];
  listCount: number = 0;
  newTaskaddedFlag: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private service: EmployeesService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    let empid: string = <string>this.route.snapshot.paramMap.get('empid');
    this.getEmployeeTasks(empid);
  }

  canDeactivate(): boolean {
    return !this.newTaskaddedFlag;
  }

  getEmployeeTasks(empid: string): void {
    this.service.employeeTasks(empid).subscribe((response: any) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i]['completed']) response[i]['status'] = 'Completed';
        else response[i]['status'] = 'Not Completed';
      }
      // console.log("resp : ",response);
      this.employeeTasksFullData = response;

      this.employeeTasks = new MatTableDataSource(response);
      this.employeeTasks.paginator = <MatPaginator>this.paginator;
      this.employeeTasks.sort = <MatSort>this.sort;
      this.listCount = response.length;
    });
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeTasks.filter = filterValue.trim().toLowerCase();

    if (this.employeeTasks.paginator) {
      this.employeeTasks.paginator.firstPage();
    }
  }

  filterStatus(status: number) {
    let tmpEmployeeTasks;
    if (status === 0) {
      tmpEmployeeTasks = this.employeeTasksFullData;
    } else {
      let tmpStatus: boolean = status === 1 ? true : false;
      tmpEmployeeTasks = this.employeeTasksFullData.filter(
        (data: EmployeeTasks) => {
          if (data.completed === tmpStatus) return data;
          else return null;
        }
      );
    }

    this.employeeTasks = new MatTableDataSource(tmpEmployeeTasks);
    this.employeeTasks.paginator = <MatPaginator>this.paginator;
    this.employeeTasks.sort = <MatSort>this.sort;
    this.listCount = tmpEmployeeTasks.length;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddNewTaskComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newTaskaddedFlag = true;
        let tmpEmployeeTask: Array<EmployeeTasks> = [
          {
            id: this.employeeTasksFullData.length,
            title: result,
            completed: false,
            status: 'Not Completed',
          },
        ];
        this.employeeTasksFullData = [
          ...tmpEmployeeTask,
          ...this.employeeTasksFullData,
        ];
        this.employeeTasks = new MatTableDataSource(this.employeeTasksFullData);
        this.employeeTasks.paginator = <MatPaginator>this.paginator;
        this.employeeTasks.sort = <MatSort>this.sort;
        this.listCount = this.employeeTasksFullData.length;
      }
    });
  }
}
