import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ResumeListComponent } from './resumes/resume-list/resume-list.component';
import { ResumeComponent } from './resumes/resume/resume.component';
import { environment } from 'src/environments/environment';
import { ResumeService } from './shared/resume.service';
import { appRoutes } from './routes';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateResumeComponent } from './resumes/create-resume/create-resume.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './authenticate/auth.guard';
import { UserService } from './authenticate/user.service';
import { AuthService } from './authenticate/auth.service';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { MaterialModule } from './material/material.module';
import { AllResumesComponent } from './resumes/all-resumes/all-resumes.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumeListComponent,
    ResumeComponent,
    NavbarComponent,
    CreateResumeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AllResumesComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    ResumeService,
    AuthService,
    UserService,
    UserResolver,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
