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
    const matError: HTMLElement = compiled.querySelector('mat-error');
    expect(matError.textContent).toContain('First name is required');
  });

  it('Last name：必須チェックのテスト', () => {
    const lastName = component.addressForm.controls['lastName'];
    lastName.markAllAsTouched();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const matError: HTMLElement = compiled.querySelector('mat-error');
    expect(matError.textContent).toContain('Last name is required');
  });

  it('addressFormがVALIDのテスト', () => {
    const addressForm = component.addressForm;
    addressForm.setValue({
      company: '',
      firstName: 'first',
      lastName: 'last',
      address: 'address',
      address2: 'address2',
      city: 'city',
      state: 'Alabama',
      postalCode: '12345',
      shipping: 'free'
    });

    spyOn(window, 'alert');
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Thanks!');
  });

  it('addressFormがINVALIDのテスト', () => {
    const addressForm = component.addressForm;
    addressForm.setValue({
      company: '',
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      shipping: ''
    });

    spyOn(window, 'alert');
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Sorry…');
  });

  it('Address 2の入力欄が表示されるかテスト', () => {
    const compiled = fixture.debugElement.nativeElement;
    const button: HTMLElement = compiled.querySelector('button');
    button.click();
    fixture.detectChanges();

    const nodeList: NodeList = compiled.querySelectorAll('textarea');
    expect(nodeList.length).toEqual(2);
  });
});
