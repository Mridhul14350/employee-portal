import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { LandingRoutingModule } from './landing-routing.module';
import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';
import { CoreModule } from '../core/core.module';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeTaskListingComponent } from './components/employee-task-listing/employee-task-listing.component';
import { MatIconModule } from '@angular/material/icon';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeListingComponent,
    EmployeeTaskListingComponent,
    AddNewTaskComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
})
export class LandingModule {}
