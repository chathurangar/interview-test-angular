import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  FirstName: string;
  LastName: string;
  Email: string;
  Major: string; 
  Average: number; 

  ngOnInit() {
  }

  addStudent(){
    var val = {firstName: this.FirstName,
      lastName: this.LastName,
      email: this.Email,
      major: this.Major,
      averageGrade: this.Average};      

      this.http.post(this.baseUrl+'Students/AddStudent',val).subscribe(result => {
        alert("Student added successfully.");
      }, error => console.error(error));
  }
}
