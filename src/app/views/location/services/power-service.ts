import {Injectable} from "@angular/core";
import {BaseService} from "../../../services/system/base.service";

@Injectable()
export class PowerService extends BaseService {
  constructor() {
    super();
    this.endPoint = "powers"
  }
}
