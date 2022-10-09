import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGuard } from '../core/guards/data.guard';
import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';
import { EmployeeTaskListingComponent } from './components/employee-task-listing/employee-task-listing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-listing',
  },
  {
    path: 'employee-listing',
    component: EmployeeListingComponent,
  },
  {
    path: 'employee-task-listing/:empid',
    canDeactivate: [DataGuard],
    component: EmployeeTaskListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
