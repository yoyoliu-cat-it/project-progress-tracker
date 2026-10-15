import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-notes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './progress-notes.html',
  styleUrl: './progress-notes.css'
})
export class ProgressNotes {

  
  codeMessage = '';

  
  projectCodes: { [key: string]: string } = {
    PPT101: 'Project Progress Tracker',
    WEB202: 'Website Redesign',
    APP303: 'Mobile Application Development',
    DATA404: 'Data Analytics Dashboard'
  };

  
  progressForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl(''),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });

  
  updateProjectName() {
    const code = this.progressForm
      .get('projectCode')
      ?.value
      ?.trim()
      .toUpperCase();

    if (code && this.projectCodes[code]) {
      this.progressForm
        .get('projectName')
        ?.setValue(this.projectCodes[code]);

      this.codeMessage = '';
    } else {
      this.progressForm
        .get('projectName')
        ?.setValue('');

      this.codeMessage = 'Project code not found.';
    }
  }
}