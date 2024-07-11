import {Component} from "@angular/core";
import {ContainerComponent, RowComponent} from "@coreui/angular";
import {NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faRefresh, faSearch, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import {BaseComponent} from "../../../system/components/base.component";
import {LocationService} from "../../services/location.service";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {NgxPaginationModule} from "ngx-pagination";
import color from "../../../../helpers/color";
import {HttpErrorResponse} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {LocationFormComponent} from "../../components/location-form/location-form.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  standalone: true,
  selector: "app-services",
  templateUrl: "location.component.html",
  styleUrls: ["location.component.scss"],
  imports: [
    ContainerComponent,
    RowComponent,
    NgForOf,
    FaIconComponent,
    NgxSkeletonLoaderModule,
    ModalModule,
    NgxPaginationModule,
    NgIf,
    FormsModule
  ]
})
export class LocationComponent extends BaseComponent {
  protected readonly colorEnergy = color;

  constructor(
    private locationService: LocationService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) {
    super()
  }


  protected override loadDependencies(params?: any): void {
    this.isLoading = true;
    this.locationService.get({...params, page: this.currentPage}).subscribe({
      next: (res: any): void => {
        this.data = res.data;
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.pageSize = res.per_page;
        this.totalItems = res.total;
      },
      error: error => {
        console.error(error);
      }
    }).add((): void => {
      this.isLoading = false;
    });
  }

  search(): void {
    if (this.isLoading) return;
    this.currentPage = 1;
    this.loadDependencies({location_name: this.form.locationName});
  }

  addLocation(): void {
    this.modalRef = this.modalService.show(LocationFormComponent, {
      class: "modal-xl",
    })
    this.modalRef.onHide?.subscribe((): void => {
      const {isSubmitted} = this.modalRef?.content
      if (isSubmitted) this.loadDependencies()
    })
  }

  async toDetailLocation(id: string): Promise<void> {
    await this.router.navigate([id], {relativeTo: this.activatedRoute});
  }


  pageChange(event: number): void {
    this.currentPage = event;
    this.loadDependencies();
  }
}
