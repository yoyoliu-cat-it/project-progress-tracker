
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ProjectApi } from '../project-api';
import { Project, ProjectInput } from '../project';

@Component({
  selector: 'app-project-crud',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-crud.html',
  styleUrl: './project-crud.css'
})
export class ProjectCrud implements OnInit {

  private fb = inject(FormBuilder);
  private projectApi = inject(ProjectApi);
  private cdr = inject(ChangeDetectorRef);

  // Store projects retrieved from MongoDB
  projects: Project[] = [];

  // Store selected project for viewing
  selectedProject: Project | null = null;

  // Store project ID when editing
  editingProjectId: string | null = null;

  // Display success or error messages
  message = '';
  errorMessage = '';

  // Reactive form with six fields
  projectForm = this.fb.nonNullable.group({
    projectName: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    status: ['Not Started', Validators.required],
    teamMember: ['', Validators.required],
    progressNote: ['']
  });

  // Load projects when component starts
  ngOnInit(): void {
    this.loadProjects();
  }

  // GET: Retrieve all projects
  loadProjects(): void {
    this.projectApi.getProjects().subscribe({
      next: data => {
        this.projects = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error loading projects:', err);
        this.errorMessage = 'Unable to load projects.';
        this.cdr.detectChanges();
      }
    });
  }

  // GET: View one project
  viewProject(id: string): void {
    this.projectApi.getProject(id).subscribe({
      next: project => {
        this.selectedProject = project;
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error retrieving project:', err);
        this.errorMessage = 'Unable to retrieve project.';
        this.cdr.detectChanges();
      }
    });
  }

  // Load existing project into the form for editing
  editProject(id: string): void {
    this.projectApi.getProject(id).subscribe({
      next: project => {
        this.editingProjectId = project._id;

        this.projectForm.patchValue({
          projectName: project.projectName,
          description: project.description,
          startDate: project.startDate.substring(0, 10),
          status: project.status,
          teamMember: project.teamMember,
          progressNote: project.progressNote
        });

        this.message = '';
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error loading project:', err);
        this.errorMessage = 'Unable to edit project.';
        this.cdr.detectChanges();
      }
    });
  }

  // POST or PUT: Save project information
  onSubmit(): void {

    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const projectData: ProjectInput =
      this.projectForm.getRawValue();

    this.message = '';
    this.errorMessage = '';

    if (this.editingProjectId) {

      // PUT: Update existing project
      this.projectApi.updateProject(
        this.editingProjectId,
        projectData
      ).subscribe({
        next: updatedProject => {
          this.message = 'Project updated successfully!';
          this.selectedProject = updatedProject;
          this.resetForm();
          this.loadProjects();
        },
        error: err => {
          console.error('Update failed:', err);
          this.errorMessage = 'Unable to update project.';
          this.cdr.detectChanges();
        }
      });

    } else {

      // POST: Create new project
      this.projectApi.addProject(projectData)
        .subscribe({
          next: () => {
            this.message = 'Project saved successfully!';
            this.resetForm();
            this.loadProjects();
          },
          error: err => {
            console.error('Save failed:', err);
            this.errorMessage = 'Unable to save project.';
            this.cdr.detectChanges();
          }
        });
    }
  }

  // DELETE: Remove selected project
  deleteProject(id: string): void {

    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    this.projectApi.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(
          project => project._id !== id
        );

        if (this.selectedProject?._id === id) {
          this.selectedProject = null;
        }

        if (this.editingProjectId === id) {
          this.resetForm();
        }

        this.message = 'Project deleted successfully!';
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Delete failed:', err);
        this.errorMessage = 'Unable to delete project.';
        this.cdr.detectChanges();
      }
    });
  }

  // Reset form to create mode
  resetForm(): void {
    this.projectForm.reset({
      projectName: '',
      description: '',
      startDate: '',
      status: 'Not Started',
      teamMember: '',
      progressNote: ''
    });

    this.editingProjectId = null;
    this.cdr.detectChanges();
  }
}
