import { formToggleControls } from '../../../../core/helpers/form-helper';
import { Type } from '../../models/type.model';
import { Category } from '../../models/category.model';
import { Survey } from '../../models/survey.model';
import 'rxjs/add/operator/filter';

import { EventEmitter, OnDestroy } from '@angular/core';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAlert } from 'app/core/contracts/i-alert';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { ICategoryService } from 'app/core/contracts/i-http-services';
import { CategoryService } from 'app/survey/services/category.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from 'rxjs/Subscription';

import { SurveyTypeService } from '../../../services/survey-type.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sur-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class SurveyFormComponent implements OnInit, IFormComponent, OnDestroy  {
  @Input() set survey(val: Survey){
    console.log(val);
    this._survey.next(val);
  }
  @Input() btnLabel = 'Submit';
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  private _survey: BehaviorSubject<Survey> = new BehaviorSubject<Survey>(new Survey());
  private _ispending = new BehaviorSubject<boolean>(false);
  private formValueSubscription: ISubscription;
  categories: Category[];
  types: Type[];
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private _categorySrvc: CategoryService,
              private _typeSrvc: SurveyTypeService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.setForm();
    this.setCategories();
    this.setTypes();
    this.formValueSubscription = this._survey.filter(x => x.id > 0).subscribe(data => this.form.patchValue(data));
  }

  isDirty(): boolean {
    return true;
  }

  formStatusReset() {
    this.form.reset(this.form.value);
  }
  open(content) {
    this.modalService.open(content);
  }

  //#region GETTERS
  get survey() {
    return this._survey.getValue();
  }
  //#endregion
  //#region SETTERS
  private setForm() {
    this.form = this.fb.group({
      id: [0, Validators.required ],
      survey_type_id: ['', Validators.required ],
      survey_category_id: ['', Validators.required ],
      survey_title: ['', Validators.required ],
      survey_isfeatured: [ 0, Validators.required ],
      survey_isactive: [0, Validators.required],
      survey_isdeleted: [0, Validators.required]
    })
  }
  private setCategories() {
    this._categorySrvc.list().take(1).subscribe(data => this.categories = <Category[]> data['category'] );
  }
  private setTypes() {
    this._typeSrvc.getAll().take(1).subscribe( data => this.types = <Type[]> data.type);
  }
  //#endregion

  onSubmit(data: any) {
    this.form.markAsPending();
    this.formSubmit.emit(data);
  }

  ngOnDestroy() {
    this.formValueSubscription.unsubscribe();
  }



  toggleControls(data: boolean) {
    formToggleControls(this.form, data);
  }
}
