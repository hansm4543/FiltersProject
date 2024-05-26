import { signal, computed } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../material-module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'addFilter.component',
  standalone: true,
  styleUrls: ['addFilter.component.css'],
  imports: [
    CommonModule,
    DemoMaterialModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: 'addFilter.component.html',
})
export class AddFilterComponent {
  contactForm: FormGroup;
  testForm: FormGroup;

  constructor(private fb: FormBuilder, testForm: FormBuilder) {
    this.contactForm = this.fb.group({
      email: [''],
      phone: [''],
      website: [''],
      date: [''],
      time: [''],
      search: [''],
      month: [''],
      number: [''],
      range: [''],
      color: [''],
      file: [''],
    });
    this.testForm = this.fb.group({
      email: [''],
      phone: [''],
      website: [''],
      date: [''],
      time: [''],
      search: [''],
      month: [''],
      number: [''],
      range: [''],
      color: [''],
      file: [''],
    });
  }

  onInputChange(fieldName: any, event: any) {
    console.log(this.contactForm);

    console.log(event);
    const value = event.target?.value;
    console.log(`Field ${fieldName} changed to ${value}`);
    // You can add your logic here to update the form based on the changed value
  }

  submit() {
    console.log(this.contactForm.value);
  }

  optionsCriteria: string[] = ['Amount', 'Title', 'Date'];
  optionsCondition: string[][] = [
    ['More', 'Less'],
    ['Starts with', 'Ends with'],
    ['From', 'To'],
  ];
  optionsValue: string[] = ['4', 'Title', 'Date'];
  myControl = new FormControl('');
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  // test = new FormGroup('');

  // profileForm = new FormGroup({
  //   myControl: new FormControl(''),
  //   myControl1: new FormControl(''),
  // });

  FieldValuesOnFirstField: string[] = ['Amount'];

  // Define a writable signal for the count and initialize it to 0
  count = signal(0);

  increment() {
    // Update the count by using the update method
    this.FieldValuesOnFirstField.push('Amount');
  }

  // Define a method to decrement the count by 1
  decrement() {
    // Update the count by using the set method
    this.FieldValuesOnFirstField.pop();
  }
}
