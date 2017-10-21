import { FormGroup } from '@angular/forms';
export function formToggleControls(form: FormGroup, condition = true) {
    if (condition) {
        Object.keys(form.controls).forEach(key => {
          form.get(key).disable();
        });
    }else {
    Object.keys(form.controls).forEach(key => {
        form.get(key).enable();
    });
    }
}
