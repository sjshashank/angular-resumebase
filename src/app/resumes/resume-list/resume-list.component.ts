import { ResumeService } from './../../shared/resume.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css, ../../../../contact/contact.component.css']
})
export class ResumeListComponent implements OnInit {

  // resume1 = {
  //   id: 1,
  //   name: 'Shashank Jain',
  //   company: 'Cognizant',
  //   experience: 1,
  //   about: 'Angular and Firebase Developer. Creater of this site...',
  //   domain: 'development',
  //   technology: '.Net',
  //   skills: 'Angular, Firebase, .Net, Python'
  // };

  constructor(private resumeService: ResumeService) { }
  resumeArray = [];  // store resume card values from firebase in array.

  ngOnInit() {
    /* Get values from firebase to display on resume cards. */
    this.resumeService.getResumes().subscribe(
      list => {
        this.resumeArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  /* Pass the desired resume identifier key from resume list to resume service */
  resumeKey($key) {
    this.resumeService.sendCustomerKey($key);
  }

}
