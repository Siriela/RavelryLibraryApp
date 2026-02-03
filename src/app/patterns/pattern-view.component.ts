import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { Pattern } from './pattern.model';

@Component({
  selector: 'app-pattern-view',
  templateUrl: './pattern-view.component.html',
  styleUrl: './pattern-view.component.css',
})
export class PatternViewComponent {
  @Input() pattern!: Pattern;

}