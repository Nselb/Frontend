import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(component: any, texts?: any, buttonConfig?: { text: string, action: (...params: any[]) => void }[], data?: any): MatDialogRef<any> {
    return this.dialog.open(component, {
      data: {
        texts,
        data,
        buttonConfig
      }
    });
  }

}
