import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <app-navbar></app-navbar>
    <router-outlet (activate)="onActivate($event)"></router-outlet>
   <!--<resume-card></resume-card> -->
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  // fixed scrolling to top on click to new page

  // onActivate(event) {
  //   window.scroll(0, 0);
  //   // or document.body.scrollTop = 0;
  //   // or document.querySelector('body').scrollTo(0,0);
  // }


  // smooth scroll to top on click to new page
  onActivate(event) {
    const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

}
