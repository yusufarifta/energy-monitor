import {Component} from "@angular/core";
import {BaseComponent} from "../../../system/components/base.component";
import {LocationService} from "../../services/location.service";
import {ActivatedRoute} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import BUTTON_PERIOD from "../../../../core/constant/button-period";
import PowerConstant, {powerIcon} from "../../../../core/constant/power-constant";
import {BUTTON_ZONE} from "../../../../core/constant/button-zone";
import {colorZone} from "../../../../helpers/color";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  standalone: true,
  templateUrl: "location-detail.component.html",
  styleUrls: ["location-detail.component.css"],
  imports: [
    FaIconComponent,
    NgIf,
    NgxSkeletonLoaderModule,
    NgForOf,
    CommonModule,
    NgxPaginationModule
  ],
})
export class LocationDetailComponent extends BaseComponent {
  protected dataPower: any = []
  private id: string
  public selectedButtonPeriod: string = "today"
  public selectedButtonZone: string = "All"

  constructor(
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.id = this.activatedRoute.snapshot.params["id"]
  }

  protected override loadDependencies(): void {
    this.isLoading = true
    this.locationService.getDetail(this.id).subscribe({
      next: (res: any): void => {
        this.data = res.data
        this.dataPower = res.data.power
        console.log(this.data)
      }
    }).add((): void => {
      this.isLoading = false
    })
  }

  selectButton(btn: string): void {
    this.selectedButtonPeriod = btn
  }

  selectButtonZone(btn: string): void {
    this.selectedButtonZone = btn
  }

  pageChange(event: number): void {
    this.currentPage = event;
    this.loadDependencies();
  }

  toDetailPower(id: string): void {
    this.router.navigate([`power/${id}`], {relativeTo: this.activatedRoute})
  }

  protected readonly BUTTON_PERIOD = BUTTON_PERIOD;
  protected readonly PowerColor = PowerConstant;
  protected readonly powerIcon = powerIcon;
  protected readonly parseFloat = parseFloat;
  protected readonly colorZone = colorZone;
  protected readonly button: string[] = BUTTON_ZONE;
}
