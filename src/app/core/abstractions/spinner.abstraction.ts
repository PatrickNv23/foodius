import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

export class SpinnerAbstraction {

  spinner: NgxSpinnerService = inject(NgxSpinnerService)

  closeSpinnerWithDelay() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
  }

}