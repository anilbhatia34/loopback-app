import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material'
import { ToasterComponent } from 'src/app/components/toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * // This is to show toaster message anywhare in app
   * @param message 
   */
  createSnackBar(message: string) {
    this.snackBar.openFromComponent(ToasterComponent, {
      data: {
        message: message
      },
      duration: 3 * 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    })
  }
}
