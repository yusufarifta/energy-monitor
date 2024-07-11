import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage, NgStyle} from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, GutterDirective } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from "../../../services/system/auth.service";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, FormsModule, GutterDirective, NgOptimizedImage, CommonModule],
})
export class LoginComponent {
  protected isLoading: boolean = false
  constructor(
    private authService: AuthService,
    private router: Router,
    private _toastrService: ToastrService
  ) { }

  public login(data: any):void {
    this.isLoading = true
    console.log(data)
    this.authService.login(data).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(["/location"])
      },
      error: error => {
        this._toastrService.error(error.error.error || error.error.message)
      }
    }).add(():void => {
      this.isLoading = false
    })
  }
}
