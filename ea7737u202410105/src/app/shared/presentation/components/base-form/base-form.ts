import {FormGroup} from '@angular/forms';

/**
 * Provides reusable validation helpers for reactive form components.
 */
export class BaseForm {
  /**
   * Checks if a form control is invalid and has been touched.
   * @param form - The form group containing the control.
   * @param controlName - The name of the control to check.
   * @returns True if the control is invalid and touched, false otherwise.
   */
  protected isInvalidControl = (form: FormGroup, controlName: string): boolean =>
    form.controls[controlName].invalid && form.controls[controlName].touched;

  /**
   * Checks if a form control has a specific validation error.
   * @param form - The form group containing the control.
   * @param controlName - The name of the control to check.
   * @param errorKey - The error key (e.g., 'required').
   * @returns True if the control has the error, false otherwise.
   */
  protected hasControlError = (form: FormGroup, controlName: string, errorKey: string): boolean =>
    form.controls[controlName].hasError(errorKey);
}
