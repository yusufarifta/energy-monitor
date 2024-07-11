import {Injectable} from "@angular/core";
import {BaseService} from "../../../services/system/base.service";

@Injectable({providedIn: "root"})
export class LocationService extends BaseService {
  constructor() {
    super();
    this.endPoint = "locations"
  }
}
