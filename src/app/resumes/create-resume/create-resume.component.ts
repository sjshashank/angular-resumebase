import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from 'src/app/shared/resume.service';
import { AuthService } from 'src/app/authenticate/auth.service';
import * as firebase from 'firebase/app';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {

  listExperienceData: MatTableDataSource<any>;
  listEducationData: MatTableDataSource<any>;
  listProjectsData: MatTableDataSource<any>;

  displayedExperienceColumns: string[] = ['excompany', 'exdesignation', 'exfrom', 'exto', 'exdetails', 'actions'];
  displayedEducationColumns: string[] = ['eddegree', 'edname', 'edfrom', 'edto', 'edscore', 'actions'];
  displayedProjectsColumns: string[] = ['pname', 'ptechnology', 'ptools', 'pdetails', 'actions'];

  experienceList = this.firebaseData.list('/resumedetails/' + firebase.auth().currentUser.uid + '/experience').snapshotChanges().subscribe(
    elist => {
      const array = elist.map(eitem => {
        return {
          $exkey: eitem.key,
          ...eitem.payload.val()
        };
      });
      this.listExperienceData = new MatTableDataSource(array);
    });

  educationList = this.firebaseData.list('/resumedetails/' + firebase.auth().currentUser.uid + '/education').snapshotChanges().subscribe(
    elist => {
      const array = elist.map(eitem => {
        return {
          $edkey: eitem.key,
          ...eitem.payload.val()
        };
      });
      this.listEducationData = new MatTableDataSource(array);
    });

  projectsList = this.firebaseData.list('/resumedetails/' + firebase.auth().currentUser.uid + '/projects').snapshotChanges().subscribe(
    elist => {
      const array = elist.map(eitem => {
        return {
          $pkey: eitem.key,
          ...eitem.payload.val()
        };
      });
      this.listProjectsData = new MatTableDataSource(array);
    });

  constructor(
    private router: Router,
    public service: ResumeService,
    public authService: AuthService,
    private firebaseData: AngularFireDatabase) { }

  ngOnInit() {
    this.service.getResumes();
    this.service.getResumeDetails();
  }

  resetForm(form) {
    form.reset();
  }

  onFirstFormSubmit() {
    if (this.service.firstFormGroup.valid) {
      // tslint:disable-next-line:max-line-length
      this.service.updateBasicDetails(firebase.auth().currentUser.uid, this.service.firstFormGroup.value);  // update resumes and resumedetails table;
    console.log(this.service.firstFormGroup.value);
    console.log(firebase.auth().currentUser.uid);
    }
    console.log(this.service.firstFormGroup.value);
  }

  onSecondFormSubmit() {
    if (this.service.secondFormGroup.valid) {
      if (!this.service.secondFormGroup.get('$edkey').value) {
        this.service.insertEducationDetails(firebase.auth().currentUser.uid, this.service.secondFormGroup.value);
      } else {
        this.service.updateEducationDetails(firebase.auth().currentUser.uid, this.service.secondFormGroup.value);
      }
    }
  }

  onThirdFormSubmit() {
    if (this.service.thirdFormGroup.valid) {
      if (!this.service.thirdFormGroup.get('$exkey').value) {
        this.service.insertExperienceDetails(firebase.auth().currentUser.uid, this.service.thirdFormGroup.value);
      } else {
        this.service.updateExperienceDetails(firebase.auth().currentUser.uid, this.service.thirdFormGroup.value);
      }
    }
  }

  onFourthFormSubmit() {
    if (this.service.fourthFormGroup.valid) {
      if (!this.service.fourthFormGroup.get('$pkey').value) {
        this.service.insertProjectDetails(firebase.auth().currentUser.uid, this.service.fourthFormGroup.value);
      } else {
        this.service.updateProjectDetails(firebase.auth().currentUser.uid, this.service.fourthFormGroup.value);
      }
    }
  }

  onDelete(ddeleteSource, $key) {
    if (confirm('Are you sure to delete this record?')) {
      this.firebaseData.list('/resumedetails/' + firebase.auth().currentUser.uid + '/' + ddeleteSource)
      .remove($key);
    }
  }
}
