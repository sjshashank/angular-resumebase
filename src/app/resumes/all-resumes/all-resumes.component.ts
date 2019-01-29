import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumeService } from 'src/app/shared/resume.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-resumes',
  templateUrl: './all-resumes.component.html',
  styleUrls: ['./all-resumes.component.css']
})
export class AllResumesComponent implements OnInit {

  constructor(private service: ResumeService, private router: Router) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'experience', 'domain', 'technology', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getResumes().subscribe(
      list => {
        const array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  onSearchClear() {
    // tslint:disable-next-line:quotemark
    this.searchKey = "";
    this.filterResult();
  }

  filterResult() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  navigateTo($key) {
    this.router.navigate(['/resumes', $key]);
  }

}
