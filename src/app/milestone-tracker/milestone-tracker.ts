import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-milestone-tracker',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './milestone-tracker.html',
  styleUrl: './milestone-tracker.css'
})
export class MilestoneTracker {
  milestoneForm = new FormGroup({
    milestoneName: new FormControl(''),
    dueDate: new FormControl(''),
    status: new FormControl(''),
    details: new FormGroup({
      owner: new FormControl(''),
      notes: new FormControl('')
    })
  });
}