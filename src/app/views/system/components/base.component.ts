import {Directive, inject, OnInit} from "@angular/core";
import {
  faArrowLeft, faArrowRight, faBattery, faBell,
  faCircleXmark, faDownload, faEllipsisV, faHouse, faPenToSquare, faPlusSquare,
  faRefresh, faSearch, faSquarePlus, faSun, faTowerCell, faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Directive()
export abstract class BaseComponent implements OnInit {
  public data: any | any[] = []
  public form: FormGroup | any = {}
  public isLoading: boolean = false;
  public period: string = "today"

  protected pageSize: number = 10;
  protected currentPage: number = 1;
  protected totalItems: number = 0;
  protected lastPage!: number
  protected nextPageUrl!: string
  protected prevPageUrl!: string
  protected disablePagination: boolean = false;
  protected icons: any = {
    faSearch,
    faRefresh,
    faSquarePlus,
    faCircleXmark,
    faArrowLeft,
    faTrashCan,
    faPenToSquare,
    faSun,
    faTowerCell,
    faBattery,
    faArrowRight,
    faHouse,
    faPlusSquare,
    faEllipsisV,
    faBell,
    faDownload
  }
  protected router: Router
  protected location: Location

  protected modalRef: BsModalRef | undefined

  protected constructor() {
    this.router = inject(Router)
    this.location = inject(Location)
  }

  ngOnInit(): void {
    this.loadDependencies()
  }

  protected loadDependencies(): void {
  }

  public refresh(): void {
    this.currentPage = 1
    this.form = {}
    this.loadDependencies()
  }

  goBack(): void {
    this.location.back()
  }

  selectPeriod(args: string): void {
    this.period = args
  }

  showLog(args: any) {
    console.log(args)
  }
}
