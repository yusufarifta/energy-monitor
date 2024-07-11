import {Component} from "@angular/core";
import {BaseComponent} from "../../../system/components/base.component";
import {ActivatedRoute} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {PowerService} from "../../services/power-service";
import BUTTON_PERIOD from "../../../../core/constant/button-period";
import PowerConstant, {powerIcon} from "../../../../core/constant/power-constant";
import colorIcon from "../../../../helpers/color"
import {CurveService} from "../../../../services/curve.service";
import {GeneralInformationService} from "../../../../services/general-information.service";

@Component({
  standalone: true,
  selector: "power-detail",
  imports: [
    FaIconComponent,
    NgIf,
    NgxSkeletonLoaderModule,
    NgForOf
  ],
  providers: [PowerService],
  templateUrl: "power-detail.component.html"
})
export class PowerDetailComponent extends BaseComponent {
  protected readonly colorIcon = colorIcon

  protected curveData: any = []
  protected curveLoading: boolean = false
  protected generalInformationLoading: boolean = false

  /*
  * This is for data in general information
 */
  protected generalInformationData: {name: string, data: any[]}[] = [
    {
      name: "Power",
      data: []
    },
    {
      name: "Voltage",
      data: []
    },
    {
      name: "Current",
      data: []
    }
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private powerService: PowerService,
    private curveService: CurveService,
    private generalService: GeneralInformationService
  ) {
    super();
  }

  protected override loadDependencies(): void {
    this.isLoading = true
    this.curveLoading = true
    this.generalInformationLoading = true
    this.powerService.getDetail(this.activatedRoute.snapshot.params["id2"]).subscribe({
      next: (res: any): void => {
        this.data = res.data
        this.getNextData()
      }
    }).add((): void => {
      this.isLoading = false
    })
  }

  getNextData = (): void => {
    this.curveLoading = true
    this.generalInformationLoading = true

    this.curveService.get({id: this.data.serial_number_id, period: this.period}).subscribe({
      next: (res: any): void => {
        console.log(res)
      }
    }).add((): void => {
      this.curveLoading = false
    })

    this.generalService.get({id: this.data.serial_number_id}).subscribe({
      next: (res: any): void => {
        const metadata = res.data[0].metadata
        for (const index in metadata) {
          switch (metadata[index].type) {
            case "active_power":
              this.generalInformationData[0].data.push(metadata[index])
              break;
            case "voltage":
              this.generalInformationData[1].data.push(metadata[index])
              break;
            case "current":
              this.generalInformationData[2].data.push(metadata[index])
              break;
          }
        }
      }
    }).add((): void => {
      this.generalInformationLoading = false
    })
  }

  protected readonly BUTTON_PERIOD = BUTTON_PERIOD;
  protected readonly PowerConstant = PowerConstant;
  protected readonly powerIcon = powerIcon;
}
