import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DemoMaterialModule } from '../material-module';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        DemoMaterialModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('First name：必須チェックのテスト', () => {
    const firstName = component.addressForm.controls['firstName'];
    firstName.markAllAsTouched();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-error').textContent).toContain('First name is required');
  });

  it('Last name：必須チェックのテスト', () => {
    const lastName = component.addressForm.controls['lastName'];
    lastName.markAllAsTouched();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-error').textContent).toContain('Last name is required');
  });

  it('addressFormがVALIDのテスト', () => {
    spyOn(window, 'alert');
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Thanks!');
  });

  it('addressFormがINVALIDのテスト', () => {
    spyOn(window, 'alert');
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Sorry…');
  });
});
