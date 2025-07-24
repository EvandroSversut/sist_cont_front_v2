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
  templateUrl: './ajuda-csosn-dialog.component.html',
  styleUrls: ['./ajuda-csosn-dialog.component.css']
})
export class AjudaCsosnDialogComponent {}