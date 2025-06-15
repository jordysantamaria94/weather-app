import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
// Propiedades de entrada para configurar el input
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() customClass: string = '';
  @Input() autocomplete: string = 'off';

  // Inyecta NgControl para acceder al FormControl padre
  // @Self() asegura que Angular busque el NgControl solo en este componente
  // @Optional() hace que la inyección sea opcional (si no se usa formControlName/ngModel)
  constructor(@Optional() @Self() public ngControl: NgControl) {
    // Si se inyecta ngControl, registra este componente como un valor accessor
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // Métodos requeridos por ControlValueAccessor
  // Estos métodos se usan internamente por Angular para conectar el input con el FormControl

  writeValue(obj: any): void {
    // Aquí puedes asignar el valor del control al input interno
    // En este caso, Angular lo maneja directamente con formControlName en el template
  }

  registerOnChange(fn: any): void {
    // Aquí registras la función que Angular llamará cuando el valor del input cambie
    // En este caso, Angular lo maneja directamente con formControlName en el template
  }

  registerOnTouched(fn: any): void {
    // Aquí registras la función que Angular llamará cuando el input sea "tocado"
    // En este caso, Angular lo maneja directamente con formControlName en el template
  }

  setDisabledState?(isDisabled: boolean): void {
    // Habilita/deshabilita el input
  }

  // Método de conveniencia para acceder al FormControl
  get control(): FormControl | null {
    return (this.ngControl?.control as FormControl) || null;
  }
}
