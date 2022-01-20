import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'storybook-button',
  template: ` 
  <button
    type="button"
    (click)="onClick.emit($event)"
    [ngClass]="classes"
    [ngStyle]="{ 'background-color': backgroundColor }"
  >No type (works)</button>
  
  <button
    type="button"
    (click)="onClickWithType.emit($event)"
    [ngClass]="classes"
    [ngStyle]="{ 'background-color': backgroundColor }"
  >EventEmitter type (works)</button>
  
  <button
    type="button"
    (click)="onClickWithGenericType.emit($event)"
    [ngClass]="classes"
    [ngStyle]="{ 'background-color': backgroundColor }"
  >EventEmitter&lt;Event&gt; type (fails)</button>
  
  `,
  styleUrls: ['./button.css'],
})
export default class ButtonComponent {
  /**
   * Is this the principal call to action on the page?
   */
  @Input()
  primary = false;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';


/** Omitting the type => will work */
@Output() onClick = new EventEmitter<Event>();

/** Ignoring the generic type => will work */
// @ts-ignore
@Output() onClickWithType: EventEmitter = new EventEmitter<Event>();


/** Using a generic type => will throw error */
@Output() onClickWithGenericType: EventEmitter<Event> = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size}`, mode];
  }
}
