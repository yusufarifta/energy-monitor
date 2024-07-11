import {ChangeDetectorRef, Component} from "@angular/core";
import {BaseComponent} from "../../../system/components/base.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {BsModalRef} from "ngx-bootstrap/modal";
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ɵTypedOrUntyped
} from "@angular/forms";
import {LocationService} from "../../services/location.service";
import {SerialNumberService} from "../../../../services/serial-number.service";
import {AuthService} from "../../../../services/system/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  standalone: true,
  selector: "add-services",
  templateUrl: "location-form.component.html",
  styleUrls: ["location-form.component.css"],
  imports: [FontAwesomeModule, NgForOf, NgSelectModule, FormsModule, ReactiveFormsModule, NgIf, NgOptimizedImage],
})
export class LocationFormComponent extends BaseComponent {
  private isSubmitted: boolean = false
  protected serialNumber: string[] = []

  constructor(
    private serialNumberService: SerialNumberService,
    private locationService: LocationService,
    private authService: AuthService,
    protected bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private toastrService: ToastrService
  ) {
    super();
    this.initializeForm()
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      location_name: ['', Validators.required],
      address: ['', Validators.required],
      status_1: [false],
      type_energy_source_1: [{value: '', disabled: true}, Validators.required],
      serial_number_1: [{value: '', disabled: true}, Validators.required],
      status_2: [{value: false, disabled: true}],
      type_energy_source_2: [{value: '', disabled: true}, Validators.required],
      serial_number_2: [{value: '', disabled: true}, Validators.required],
      status_3: [{value: false, disabled: true}],
      type_energy_source_3: [{value: '', disabled: true}, Validators.required],
      serial_number_3: [{value: '', disabled: true}, Validators.required],
    })
    this.form.valueChanges.subscribe((): void => {
      this.cd.detectChanges()
    })
  }

  public get formControls() {
    return new Proxy(this.form.controls, {
      get(target: ɵTypedOrUntyped<any, any, { [p: string]: AbstractControl<any> }>, p: string, receiver: any): any {
        if (p in target) return target[p]
        else {
          console.warn(`Form control ${String(p)} does not exist.`);
          return null;
        }
      }
    })
  }

  protected override loadDependencies(): void {
    this.serialNumberService.get({tenant_id: this.authService.getUser()["tenant_id"]}).subscribe({
      next: (res: { data: { serial_number: string }[] }): void => {
        this.serialNumber = res.data.map((d: { serial_number: string }) => d.serial_number)
      }
    })
  }

  protected toggleChange(event: any, index: number): void {
    if (event.checked) {
      this.formControls[`type_energy_source_${index}`].enable()
      this.formControls[`serial_number_${index}`].enable()
      if (index < 4) this.formControls[`status_${++index}`].enable()
    } else {
      this.formControls[`type_energy_source_${index}`].disable()
      this.formControls[`serial_number_${index}`].disable()
      if (index < 4) this.formControls[`status_${++index}`].disable()
    }
  }

  public submit(): void {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.isLoading = true
      this.isSubmitted = true
      this.locationService.save(this.form.value).subscribe({
        next: (res: any): void => {
          this.toastrService.success("success")
          this.bsModalRef.hide()
        },
        error: (error): void => {
          this.toastrService.error(error?.error?.message)
        }
      }).add((): void => {
        this.isLoading = false
      })
    }
  }

}
