import { ProjectCrud } from './project-crud/project-crud';
import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'projects',
  component: ProjectCrud
}];
