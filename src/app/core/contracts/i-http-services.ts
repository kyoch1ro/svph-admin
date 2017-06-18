import { Observable } from 'rxjs/Observable';


export interface IHttpService{
  getById(id: number): Observable<any>;
  list(id?: number): Observable<any>;
  add(data: any): Observable<any>;
  delete(id: number): Observable<any>;
  update(id: number): Observable<any>;
  count(): Observable<any>;
}


export interface IUserService extends IHttpService{
  getOtherInfo(id: number): Observable<any>;
  approveUser(id: number): Observable<any>;
}



export interface ISurveyService extends IHttpService{
  getRespondentsCount(id: number): Observable<any>;
}


export interface ICategoryService extends IHttpService{
  
}

export interface ITypeService extends IHttpService{
  
}


export interface IQuestionService extends IHttpService{
  
}

export interface IOptionService extends IHttpService{
  
}