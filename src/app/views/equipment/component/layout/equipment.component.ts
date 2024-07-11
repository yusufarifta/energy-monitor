import {Component} from "@angular/core";
import {BaseComponent} from "../../../system/components/base.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faRefresh, faSearch} from "@fortawesome/free-solid-svg-icons";
import {EquipmentService} from "../../../../services/equipment/equipment.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {ZoneService} from "../../../../services/zone/zone.service";
import {LocationService} from "../../../location/services/location.service";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: "app-equipment",
  styleUrls: ["equipment.component.scss"],
  standalone: true,
  imports: [
    NgSelectModule,
    FaIconComponent,
    NgIf,
    NgForOf,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgxSkeletonLoaderModule,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: "equipment.component.html"
})
export class EquipmentComponent extends BaseComponent {
  public locationData: string[] = []
  public zoneData: string[] = []

  constructor(
    private equipmentService: EquipmentService,
    private zoneService: ZoneService,
    private locationService: LocationService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadLocation()
  }

  protected override loadDependencies(params?: any): void {
    this.isLoading = true
    this.equipmentService.get({...params, page: this.currentPage}).subscribe({
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
      next: (res: {data: any[]}): void => {
        this.locationData = res.data.map(d => d.location_name)
      },
      error: error => {
        console.error(error)
      }
    })
  }

  loadZone(args: string): void {
    if (args) {
      console.log(args)
      this.zoneService.get({location_name: args}).subscribe({
        next: (res: {data: any[]}): void => {
          this.zoneData = res.data.map(d => d.zone_name)
        },
        error: error => {
          console.error(error)
        }
      })
    }
  }

  search(): void {
    this.loadDependencies({location_name: this.form.locationName, zone_name: this.form.zoneName, equipment_name: this.form.equipment_name})
  }

  pageChange(event: number): void {
    this.currentPage = event;
    this.loadDependencies();
  }
}
