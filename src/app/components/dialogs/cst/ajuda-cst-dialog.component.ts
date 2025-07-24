import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ajuda-cst-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './ajuda-cst-dialog.component.html',
  styleUrls: ['./ajuda-cst-dialog.component.css']
})
export class AjudaCstDialogComponent {}