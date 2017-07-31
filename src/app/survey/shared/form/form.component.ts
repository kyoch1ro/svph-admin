import { Component, OnInit, Input, Inject, Output } from '@angular/core';
import { ICategoryService, ITypeService } from 'app/core/contracts/i-http-services';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { EventEmitter } from '@angular/core';
import { Survey } from './../../survey.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormGroup,
         FormBuilder,
         Validators,
         FormControl} from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

import { ICategoryDTO } from 'app/survey/category/i-category';
import { CategoryService } from 'app/survey/category/category.service';

import { ITypeDTO } from 'app/survey/type/i-type';
import { TypeService } from 'app/survey/type/type.service';
import { IAlert } from 'app/core/contracts/i-alert';

@Component({
  selector: 'sur-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, IFormComponent  {
  @Input() set survey(val: Survey){
    this._survey.next(val);
  }
  @Input() btnLabel = 'Submit';
  @Input() set isPending(val){
    this._ispending.next(val);
  }
  @Input() alert: IAlert;

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  private _survey = new BehaviorSubject<Survey>(new Survey());
  private _ispending = new BehaviorSubject<boolean>(false);

  categories: ICategoryDTO[];
  types: ITypeDTO[];
  form: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(CategoryService) private _categorySrvc: ICategoryService,
              @Inject(TypeService) private _typeSrvc: ITypeService) { }

  ngOnInit() {
    this._initializeForm();

    const cat_sub: ISubscription =  this._categorySrvc.list()
    .subscribe(
      data => { this.categories = <ICategoryDTO[]> data['category'] },
      err => {},
      () => {
        cat_sub.unsubscribe()
      });

    const typ_sub: ISubscription = this._typeSrvc.list()
    .subscribe(
      data => { this.types = <ITypeDTO[]> data.type},
      err => {},
      () => typ_sub.unsubscribe()
    );
    this._ispending.subscribe(data=> {
      this.toggleControls(data);
    });

    this._survey
    .subscribe(data => {
      if (!data) {
        return;
      }
      this.form.patchValue(data)
    });
  }


  get survey() {
    return this._survey.getValue();
  }

  get isPending(){
    return this._ispending.getValue();
  }

  isDirty(): boolean {
    return true;
  }

  onSubmit(data: any) {
    if (this.form.invalid) {
       return;
    }
    this.formSubmit.emit(data);
  }

  private _initializeForm() {
    this.form = this.fb.group({
      id: ['', Validators.required ],
      survey_type_id: ['', Validators.required ],
      survey_category_id: ['', Validators.required ],
      survey_title: ['', Validators.required ],
      survey_isfeatured: [ 0, Validators.required ],
      start_date: ['', Validators.required ],
      end_date: ['', Validators.required ],
      survey_isactive: ['', Validators.required],
      survey_isdeleted: ['', Validators.required]
    })
  }

  toggleControls(data: boolean) {
    if (data) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).disable();
      });
    }else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).enable();
      });
    }
  }
}
