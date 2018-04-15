import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  tasks = [];
  num_tasks = this.tasks.length;
  tasks_present = false;
  newTask: any;
  display_edit_form = false;
  taskToEdit: any;

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getTasksFromService();
    this.newTask = { title: "", description: ""}
  }

  onSubmit() {
    console.log("this.newTask in component onSubmit: ",this.newTask);
    let observerable = this._httpService.addTask(this.newTask);
    observerable.subscribe(data => {
      console.log(data)
      console.log("Save response from server: ",data['message']);
    })
    this.newTask = { title: "", description: ""}
  }

  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks in the component!", data);
      this.tasks = data['data'];
      this.num_tasks = this.tasks.length;
      if (this.num_tasks > 0){
        this.tasks_present = true;
      }
      console.log("Tasks Present: ", this.tasks_present);
      console.log(this.tasks);
      console.log(this.tasks[0]);
      console.log(this.tasks[0].title);
    })
  }
  onButtonClickEvent(event: any): void { 
    console.log(`Click event is working with event: `, event);
  }
  deleteTask(e){
    console.log("Task Id: ", e['target']['parentElement']['id']);
    let id = e['target']['parentElement']['id'];
    let observerable = this._httpService.deleteTaskById(id);
    observerable.subscribe(data => {
      console.log("Status from delete Task: ", data['message']);
    })
  }

  editSubmit(e){
    console.log("In editSubmit, event: ", e);
    console.log("In editSubmit, event-form: ", e['form']);
    console.log("In editSubmit, taskToEdit: ", this.taskToEdit);
    let id = this.taskToEdit._id;
    let observerable = this._httpService.updateTaskById(this.taskToEdit);
    observerable.subscribe(data => {
      console.log("Status from update Task: ", data['message']);
    })    
    this.display_edit_form = false;
  }

  editTask(e){
    console.log("Task Id: ", e['target']['parentElement']['id']);
    let id = e['target']['parentElement']['id']);
    let observerable = this._httpService.getTaskByID(id);
    observerable.subscribe(data => {
      console.log("Status from get task by id: ", data['message']);
      console.log("Data from getTaskByID: ", data);
      console.log("data 1:", data['data'][0]['title'])
      console.log("data 2:", data['data'][0]['description'])
      this.taskToEdit = {
        '_id' : data['data'][0]['_id'],
        'title' : data['data'][0]['title'],
        'description' : data['data'][0]['description']
      }
      console.log("Just before displaying edit form => this.taskToEdit", this.taskToEdit);
      this.display_edit_form = true;
    })
  }

  refetchTasks(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks in response to a refetch request!", data);
      this.tasks = data['data'];
      this.num_tasks = this.tasks.length;
      if (this.num_tasks > 0){
        this.tasks_present = true;
      }
      console.log("Tasks Present: ", this.tasks_present);
      console.log(this.tasks);
      console.log(this.tasks[0]);
      console.log(this.tasks[0].title);
    })    
  }
}

