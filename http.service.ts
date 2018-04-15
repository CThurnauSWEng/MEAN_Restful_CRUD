import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks();
  }

  getTasks(){
    return this._http.get('/restful');
  }

  addTask(newtask){
    console.log("in service addTask: ", newtask);
    return this._http.post('/restful', newtask)
  }
  updateTaskById(taskToEdit){
    console.log("in service updateTaskById, id: ", taskToEdit, taskToEdit['_id']);
    var urlString = '/restful/' + taskToEdit['_id'];
    console.log("URL String in http service: ", urlString);
    return this._http.put(urlString, taskToEdit)
  }

  deleteTaskById(id){
    console.log("in service deleteTaskByID, id: ", id);
    return this._http.get('/restful/delete/' + id)
  }

  getTaskByID(id){
    console.log("in service getTaskByID, id: ", id);
    return this._http.get('/restful/' + id);
  }
}

