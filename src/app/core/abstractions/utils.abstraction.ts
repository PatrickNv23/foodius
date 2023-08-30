import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastService } from "angular-toastify";
import { ERROR_MESSAGE, UTILS_DELAY } from "../constants/constanst";

export abstract class UtilsAbstraction {

  spinner: NgxSpinnerService = inject(NgxSpinnerService)
  toastService: ToastService = inject(ToastService)

  closeSpinnerWithDelay() {
    setTimeout(() => {
      this.spinner.hide();
    }, UTILS_DELAY)
  }

  showErrorAlertWithDelay(error: string = ERROR_MESSAGE) {
    setTimeout(() => {
      this.toastService.error(error)
    }, UTILS_DELAY)
  }

  showErrorAlert(error: string = ERROR_MESSAGE) {
    this.toastService.error(error)
  }

}