import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../model/UserData';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  loading: boolean = false; // Flag variable
  file: any = null; // Variable to store file to Upload
  infoMessage: any;
  data: UserData[] = [];
  errorMessage: string = '';
  count = 0;
  dataSource = new MatTableDataSource([]);
  paginatedItems: any[] = [];
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private UploadService: UploadService) {}

  displayedColumns = [
    'userId',
    'fullName',
    'jobTitle',
    'department',
    'businessUnit',
    'gender',
    'age',
    'country',
    'city',
  ];

  ngOnInit() {}
  onSelect(event: any) {
    this.file = event.target.files[0];
    this.infoMessage = '';
    this.errorMessage = '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUserData() {
    this.infoMessage='';
    this.errorMessage='';
    this.UploadService.getUserData().subscribe(
      (data) => {
        this.data = data;
        this.count = this.data.length;
        if (this.count === 0) {
          this.infoMessage = 'No record found in DB';
        }
        this.dataSource.data = data;
        console.log(this.data);
      },
      (error) => {
        console.log(error?.message);
        this.errorMessage = 'Backend Service is down or something went wrong';
      }
    );
  }

  // OnClick of button Upload
  onUpload() {
    this.infoMessage = '';
    if (this.file) {
      this.loading = true;
      console.log(this.file);

      this.UploadService.uploadFile(this.file).subscribe(
        (data) => {
          this.loading = false;
          console.log(data);
          this.infoMessage = data;
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.errorMessage = 'something went wrong ' + error?.message;
        }
      );
    } else {
      this.infoMessage = 'please select the file ';
    }
  }
}
