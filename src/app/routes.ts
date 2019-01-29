import { Routes } from '@angular/router';
import { ResumeListComponent } from './resumes/resume-list/resume-list.component';
import { ResumeComponent } from './resumes/resume/resume.component';
import { CreateResumeComponent } from './resumes/create-resume/create-resume.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './authenticate/auth.guard';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AllResumesComponent } from './resumes/all-resumes/all-resumes.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
    { path: 'profile', component: ContactComponent },
    { path: 'resumelist', component: AllResumesComponent},
    { path: 'resumes/new', component: CreateResumeComponent},
    { path: 'resumes', component: ResumeListComponent },
    { path: 'resumes/:$key', component: ResumeComponent},
    { path: '', redirectTo: '/resumes', pathMatch: 'full'}
];
