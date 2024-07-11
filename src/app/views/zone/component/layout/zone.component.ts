import {Component} from "@angular/core";
import {BaseComponent} from "../../../system/components/base.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {BUTTON_ZONE} from "../../../../core/constant/button-zone";
import {CommonModule, NgForOf} from "@angular/common";
import {colorZone} from "../../../../helpers/color";
import {ZoneService} from "../../../../services/zone/zone.service";
import {NgxPaginationModule} from "ngx-pagination";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faEllipsis, faEllipsisH, faEllipsisV, faRefresh, faSearch} from "@fortawesome/free-solid-svg-icons";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {LocationService} from "../../../location/services/location.service";

@Component({
  selector: "app-zone",
  templateUrl: "zone.component.html",
  styleUrls: ["zone.component.scss"],
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    NgForOf,
    CommonModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    FaIconComponent,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
  ]
})
export class ZoneComponent extends BaseComponent {
  protected readonly colorZone: (args: string) => string = colorZone;
  protected readonly button: string[] = BUTTON_ZONE
  public selectedButton: string = 'All'
  public locationData: any[] = []

  constructor(
    private zoneService: ZoneService,
    private locationService: LocationService
  ) {
    super();
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.loadLocation()
  }

  protected override loadDependencies(params?: object): void {
    this.isLoading = true
    this.zoneService.get({...params, page: this.currentPage}).subscribe({
      next: (res: any): void => {
        console.log(res)
        this.data = res.data
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.pageSize = res.per_page;
        this.totalItems = res.total;
      },
      error: error => {
        console.error(error)
      }
    }).add((): void => {
      this.isLoading = false
    })
  }

  loadLocation(): void {
    this.locationService.get().subscribe({
      next: (res: any): void => {
        this.locationData = res.data.map((data: { location_name: any; }) => data.location_name)
        console.log(this.locationData)
      }
    })
  }

  selectButton(args: string): void {
    this.selectedButton = args
    this.currentPage = 1
    this.loadDependencies({range: args === "All" ? '' : args})
  }

  pageChange(event: number): void {
    this.currentPage = event;
    this.loadDependencies();
  }

  search(): void {
    console.log(this.form)
    this.loadDependencies({location_name: this.form["locationName"], zone_name: this.form["zoneName"]})
  }
}
