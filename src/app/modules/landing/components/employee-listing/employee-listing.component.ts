import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { EmployeesService } from '../../services/employees.service';
import { MatSort } from '@angular/material/sort';
import { EmployeeData } from '../../models/employee';


@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.scss'],
})
export class EmployeeListingComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  allEmployees = new MatTableDataSource<EmployeeData>([]);
  displayedColumns = ['name', 'phone', 'email'];
  listCount: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private service: EmployeesService) {}

  ngAfterViewInit() {
    // this.allEmployees = new MatTableDataSource(Array<EmployeeData>());
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  ngOnDestroy(): void {}

  getAllEmployees(): void {
    this.service.employees().subscribe((response: any) => {
      this.allEmployees = new MatTableDataSource(response);
      this.allEmployees.paginator = <MatPaginator>this.paginator;
      this.allEmployees.sort = <MatSort>this.sort;
      this.listCount = response.length;
    });
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allEmployees.filter = filterValue.trim().toLowerCase();

    if (this.allEmployees.paginator) {
      this.allEmployees.paginator.firstPage();
    }
  }
}
