import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/interfaces/ITask';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { TaskService } from 'src/app/services/task.service';
import { Role } from 'src/app/staticClasses/IRole';
import { TaskStatus } from 'src/app/staticClasses/ITaskStatus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tasks: ITask[] = [];

  public taskName: string = "";

  public isAdmin: boolean;

  constructor(private taskService: TaskService, private authorizeService: AuthorizeService) { 
    let role = authorizeService.getRoleFromToken();

    this.isAdmin = role == Role.Admin ? true : false;
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.taskService.getTasks().subscribe(
      data => {
        this.tasks = data;
      },
      error => {
        
      }
    );
  }

  AddTask(){
    let task = {} as ITask;
    task.name = this.taskName;

    this.taskService.createTask(task).subscribe(
      data => {
        this.loadTasks();
      },
      error => {

      }
    );
  }

  DeleteTask(id: number){
    if(confirm("Are you sure want to delete the task?")){
      this.taskService.deleteTask(id).subscribe(
        data => {
          this.loadTasks();
        },
        error => {
  
        }
      );
    }
    
  }

  onChangeTaskStatus(id: number, event: any){
    if(confirm("Are you sure want to change the task status?")){

      this.taskService.updateTask(id)
        .subscribe(
          data => {
            this.loadTasks();
          },
          error => {
            
          }
        );

    }

  }

  get TaskStatus() {
    return TaskStatus;
  }

  Logout(){
    this.authorizeService.logout();
  }
}
