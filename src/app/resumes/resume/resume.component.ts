import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/shared/resume.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  $key: string;
  resume: any;
  resumeDetails: any;
  address: any;
  contact: any;
  email: any;
  interests: any;
  about: any;
  company: any;
  domain: any;
  experience: any;
  name: any;
  skills: any;
  technology: any;
  gender: any;

  experienceList: any;
  educationList: any;
  projectsList: any;

  resumeArray = [];
  experienceArray = [];
  educationArray = [];
  projectsArray = [];

  constructor(private resumeService: ResumeService, private route: ActivatedRoute, private firebase: AngularFireDatabase) { }

  ngOnInit() {
    this.resumeService.customerKey.subscribe($key => this.$key = $key); // Get resume key from resume list component through resume service.

    this.route.params.subscribe(params => {
      this.resume = this.firebase.list('/resumes/' + params['$key']).snapshotChanges().subscribe(ritem => {
        // console.log(ritem),
        this.about = ritem[0].payload.val(),
        this.company = ritem[1].payload.val(),
        this.domain = ritem[2].payload.val(),
        this.experience = ritem[3].payload.val(),
        this.name = ritem[4].payload.val(),
        this.skills = ritem[5].payload.val();
        this.technology = ritem[6].payload.val();
      });
      this.resumeDetails = this.firebase.list('/resumedetails/' + params['$key']).snapshotChanges().subscribe(item => {
        // console.log(item));
        this.address = item[0].payload.val(),
        this.contact = item[1].payload.val(),
        this.email = item[3].payload.val(),
        this.gender = item[5].payload.val(),
        this.interests = item[6].payload.val();
      });
      this.educationList = this.firebase.list('/resumedetails/' + params['$key'] + '/education').snapshotChanges().subscribe(
        edlist => {
          this.educationArray = edlist.map(editem => {
            return {
              $edkey: editem.key,
              ...editem.payload.val()
            };
          });
        });
      this.experienceList = this.firebase.list('/resumedetails/' + params['$key'] + '/experience').snapshotChanges().subscribe(
        elist => {
          this.experienceArray = elist.map(eitem => {
            return {
              $exkey: eitem.key,
              ...eitem.payload.val()
            };
          });
        });
        this.projectsList = this.firebase.list('/resumedetails/' + params['$key'] + '/projects').snapshotChanges().subscribe(
          plist => {
            this.projectsArray = plist.map(pitem => {
              return {
                $pkey: pitem.key,
                ...pitem.payload.val()
              };
            });
          });
      });
  }

}
