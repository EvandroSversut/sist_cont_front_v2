import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ajuda-origem-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './ajuda-origem-dialog.component.html',
  styleUrls: ['./ajuda-origem-dialog.component.css']
})
export class AjudaOrigemDialogComponent {}