import { ISurveyDuration } from '../../survey/shared/survey.interface';
import { Observable } from 'rxjs/Observable';


export interface IHttpService{
  getById(id: number): Observable<any>;
  list(id?: number): Observable<any>;
  add(data: any): Observable<any>;
  delete(id: number): Observable<any>;
  update(data: any): Observable<any>;
  count(): Observable<any>;
}

export interface IHttpServices<T>{
  getById(id: number): Observable<T>;
  list(id?: number): Observable<T>;
  add(data: T): Observable<T>;
  delete(id: number): Observable<T>;
  update(data: T): Observable<T>;
  count(): Observable<T>;
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

export interface ISurveyDurationService<T> extends IHttpServices<T> {

}