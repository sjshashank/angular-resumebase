import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../authenticate/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private keySource = new BehaviorSubject('default message');
  customerKey = this.keySource.asObservable();

  constructor(private firebase: AngularFireDatabase, public authService: AuthService) { }
  resumeList: AngularFireList<any>;
  resumeDetailsList: AngularFireList<any>;

  // Declarations for create-resume component
  firstFormGroup: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    interests: new FormControl('', Validators.required),
    experience: new FormControl('', [Validators.required, Validators.min(0), Validators.max(50)]),
    gender: new FormControl('Male'),
    company: new FormControl('', Validators.required),
    domain: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required),
    technology: new FormControl('', Validators.required),
  });

  secondFormGroup: FormGroup = new FormGroup({
    $edkey: new FormControl(null),
    eddegree: new FormControl('', Validators.required),
    edname: new FormControl('', Validators.required),
    edfrom: new FormControl('', Validators.required),
    edto: new FormControl('', Validators.required),
    edscore: new FormControl('', Validators.required)
  });

  thirdFormGroup: FormGroup = new FormGroup({
    $exkey: new FormControl(null),
    excompany: new FormControl('', Validators.required),
    exdesignation: new FormControl('', Validators.required),
    exfrom: new FormControl('', Validators.required),
    exto: new FormControl('', Validators.required),
    exdetails: new FormControl('', Validators.required)
  });

  fourthFormGroup: FormGroup = new FormGroup({
    $pkey: new FormControl(null),
    pname: new FormControl('', Validators.required),
    ptechnology: new FormControl('', Validators.required),
    ptools: new FormControl('', Validators.required),
    pdetails: new FormControl('', Validators.required)
  });

  /* Get data to be displayed on resume cards from firebase. Used in ResumeList Component. */
  getResumes() {
    this.resumeList = this.firebase.list('/resumes');
    return this.resumeList.snapshotChanges();
  }

  getResumeDetails() {
    this.resumeDetailsList = this.firebase.list('/resumedetails');
    return this.resumeDetailsList.snapshotChanges();
  }

  /* Get the desired resume unique identifier and pass on to resume component. */
  sendCustomerKey($key: string) {
    this.keySource.next($key);
  }

  updateBasicDetails(uid, resume) {
    this.resumeList.update(uid,
      {
        about: resume.about,
        company: resume.company,
        domain: resume.domain,
        experience: resume.experience,
        name: resume.fullName,
        skills: resume.skills,
        technology: resume.technology
      });
      this.resumeDetailsList.update(uid,
        {
          address: resume.address,
          contact: resume.contact,
          email: resume.email,
          interests: resume.interests,
          gender: resume.gender
        });
  }

  insertEducationDetails(uid, resume) {
    this.firebase.database.ref(`resumedetails/${uid}/education`)
      .push({
        eddegree: resume.eddegree,
        edname: resume.edname,
        edfrom: resume.edfrom,
        edto: resume.edto,
        edscore: resume.edscore
      });
  }

  updateEducationDetails(uid, resume) {
    this.firebase.database.ref(`resumedetails/${uid}/education/${resume.$edkey}`)
      .update({
        eddegree: resume.eddegree,
        edname: resume.edname,
        edfrom: resume.edfrom,
        edto: resume.edto,
        edscore: resume.edscore
      });
  }

  insertExperienceDetails(uid, resume) {
    this.firebase.database.ref(`resumedetails/${uid}/experience`)
      .push({
        excompany: resume.excompany,
        exdesignation: resume.exdesignation,
        exfrom: resume.exfrom,
        exto: resume.exto,
        exdetails: resume.exdetails
      });
  }

  updateExperienceDetails(uid, resume) {
    this.firebase.database.ref(`resumedetails/${uid}/experience/${resume.$exkey}`)
      .update({
        excompany: resume.excompany,
        exdesignation: resume.exdesignation,
        exfrom: resume.exfrom,
        exto: resume.exto,
        exdetails: resume.exdetails
      });
  }

  insertProjectDetails(uid, resume) {
    this.firebase.database.ref(`resumedetails/${uid}/projects`)
      .push({
        pname: resume.pname,
        ptechnology: resume.ptechnology,
        ptools: resume.ptools,
        pdetails: resume.pdetails
      });
  }

  updateProjectDetails(uid, resume) {
    this.firebase.database.ref(`resumedetails/${uid}/projects/${resume.$pkey}`)
      .update({
        pname: resume.pname,
        ptechnology: resume.ptechnology,
        ptools: resume.ptools,
        pdetails: resume.pdetails
      });
  }

  // Fill form with data if resume exists on "Create Resume" click event
  populateFirstFormGroup(resume) {
    this.firstFormGroup.setValue(resume);
  }

  // Fill forms with data on "Launch" click event
  populateForm(data) {
    console.log(data);
    // this.thirdFormGroup.setValue(data);
  }
}
