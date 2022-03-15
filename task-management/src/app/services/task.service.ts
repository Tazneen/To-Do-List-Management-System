import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/IResponse';
import { ITask } from '../interfaces/ITask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  public createTask(task : ITask) : Observable<ITask> {
    return this.httpClient.post<ITask>('api/task', task);
  }

  public updateTask(taskId: number) : Observable<ITask> {
    return this.httpClient.put<ITask>('api/task/' + taskId, null);
  }

  public deleteTask(taskId : number) : Observable<IResponse<ITask>> {
    return this.httpClient.delete<IResponse<ITask>>('api/task/' + taskId);
  }

  public getTasks() : Observable<ITask[]>{
    return this.httpClient.get<ITask[]>('api/task');
  }
}
