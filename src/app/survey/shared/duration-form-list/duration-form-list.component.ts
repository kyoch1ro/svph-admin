import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Duration } from '../models/duration.model';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sur-duration-form-list',
  templateUrl: 'duration-form-list.component.html'
})
export class DurationFormListComponent implements OnInit, OnDestroy {
  @Input() durations: Duration[] = [];
  @Input() surveyId: number;
  @Output() formSubmitted = new EventEmitter<Duration>();
  modalInstance: NgbModalRef;
  formTemplate: Duration;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.formTemplate = new Duration({
      survey_id: this.surveyId
    });
  }


  get hasActiveDuration() {
    let hasActive = false;
    const time_now = new Date();
    this.durations.forEach(x => {
      const end = new Date(x.end_date);
      if (end > time_now) {
        hasActive = true;
        return;
      }
    })


    return hasActive;
  }
  addDuration(content) {
    this.modalInstance = this.modalService.open(content, {
      size: 'lg'
    });
  }

  ngOnDestroy() {
    if (this.modalInstance) this.modalInstance.close();
  }


}
