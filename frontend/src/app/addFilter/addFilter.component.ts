// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-second',
//   standalone: true,
//   imports: [],
//   templateUrl: './second.component.html',
//   styleUrl: './second.component.css'
// })
// export class SecondComponent {

// }

import { Component } from '@angular/core';
import { signal, computed } from '@angular/core';

@Component({
  selector: 'addFilterPage',
  template: `
    <div>
      <p>The count is: {{ count() }}</p>
      <p>The double count is: {{ doubleCount() }}</p>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
    </div>
  `,
})
export class AddFilterComponent {
  // Define a writable signal for the count and initialize it to 0
  count = signal(0);

  // Define a computed signal for the double count that depends on the count
  doubleCount = computed(() => this.count() * 2);

  // Define a method to increment the count by 1
  increment() {
    // Update the count by using the update method
    this.count.update((value) => value + 1);
  }

  // Define a method to decrement the count by 1
  decrement() {
    // Update the count by using the set method
    this.count.set(this.count() - 1);
  }
}
