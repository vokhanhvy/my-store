import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  @Output() checkoutSuccess: EventEmitter<string> = new EventEmitter();

  firstName: string = '';
  address: string = '';
  creditCard: string = '';
  showSuccess: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  // on form submission
  onSubmit(): void {
    // Emit firstName value to the parent component
    this.checkoutSuccess.emit(this.firstName);
    // Set true to show checkout success component
    this.showSuccess = true;
  }
  validateField(fieldName: string): void {}
}
