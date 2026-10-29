import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';
import { ProgressNotes } from './progress-notes/progress-notes';
import { ProjectOverview } from './project-overview/project-overview';
import { TechnologyChecklist } from './technology-checklist/technology-checklist';
import { MilestoneApi } from './milestone-api/milestone-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MilestoneTracker,
    ProgressNotes,
    ProjectOverview,
    TechnologyChecklist,
    MilestoneApi
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Project Progress Tracker';
}