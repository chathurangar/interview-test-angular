import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public students: Student[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadStudents();
  }

  public getColor(value: number): string{
    return value > 80 ? "green" : (value > 50 ? 'orange' : 'red');
 }

 loadStudents() {
  this.http.get<Student[]>(this.baseUrl + 'students').subscribe(result => {
    this.students = result;
  }, error => console.error(error));
 }

 deleteStudent(student){   

    this.http.post<any>(this.baseUrl+'Students/DeleteStudent',student).subscribe(result => {
      alert("Student deleted successfully.");
      this.loadStudents();
    }, error => console.error(error));
}
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
}