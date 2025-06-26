import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Member } from '../models/member.model'; // Assurez-vous que le chemin est correct
@Component({
  selector: 'app-member',
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {

  currentMember: Member = { id: 0, firstName: '', lastName: '', email: '' };
  isEditMode: boolean = false;
  modalInstance: any;

  openModal(member?: Member) {
    this.isEditMode = !!member;

    if (member) {
      this.currentMember = { ...member };
    } else {
      this.currentMember = { id: 0, firstName: '', lastName: '', email: '' };
    }

    const modalElement = document.getElementById('memberModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    } else {
      console.error('Modal element with id "memberModal" not found.');
    }
  }

  submit() {
    if (this.isEditMode) {
      console.log('Modifier membre :', this.currentMember);
      // Appelle ici ton service d'édition
    } else {
      console.log('Ajouter membre :', this.currentMember);
      // Appelle ici ton service de création
    }

    this.modalInstance.hide();
  }
}
