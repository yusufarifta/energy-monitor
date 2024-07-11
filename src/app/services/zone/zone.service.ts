import {Injectable} from "@angular/core";
import {BaseService} from "../system/base.service";

@Injectable({providedIn: "root"})
export class ZoneService extends BaseService {
  constructor() {
    super();
    this.endPoint = "zones"
  }
}
