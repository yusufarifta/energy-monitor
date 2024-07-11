import {Injectable} from "@angular/core";
import {BaseService} from "./system/base.service";

@Injectable({providedIn: "root"})
export class GeneralInformationService extends BaseService {
  constructor() {
    super();
    this.endPoint = "general-informations"
  }
}
