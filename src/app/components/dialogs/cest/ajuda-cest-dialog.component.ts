import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ajuda-stPisCofin-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './ajuda-cest-dialog.component.html',
  styleUrls: ['./ajuda-cest-dialog.component.css']
})
export class AjudaCestDialogComponent {

  
}

