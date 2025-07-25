import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Member } from '../models/member.model';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-member',
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  constructor(private apiService: ApiService) { }

  members: Member[] = [];
  currentMember: Member = { id: 0, firstname: '', lastname: '', email: '' };
  isEditMode: boolean = false;
  modalInstance: any;
  errorMessage: string = '';

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.apiService.getMembers().subscribe(data => this.members = data);
  }

  submit() {
    this.errorMessage = '';
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\s]+$/;
    const emailRegex = /@/;

    if (!this.currentMember.firstname || !this.currentMember.lastname || !this.currentMember.email) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    if (!nameRegex.test(this.currentMember.firstname)) {
      this.errorMessage = 'Firstname must contain only letters.';
      return;
    }
    if (!nameRegex.test(this.currentMember.lastname)) {
      this.errorMessage = 'Lastname must contain only letters.';
      return;
    }
    if (!emailRegex.test(this.currentMember.email)) {
      this.errorMessage = 'Email must contain an "@" character.';
      return;
    }

    if (this.isEditMode) {
      this.apiService.updateMember(this.currentMember).subscribe({
        next: () => {
          this.loadMembers();
          this.closeModal();
        },
        error: err => { this.errorMessage = 'Erreur lors de la modification.'; }
      });
    } else {
      this.apiService.addMember(this.currentMember).subscribe({
        next: () => {
          this.loadMembers();
          this.closeModal();
        },
        error: (err) => {
          if (err.error && err.error.message && err.error.message.includes('email')) {
            this.errorMessage = 'This email is already used.';
          } else {
            this.errorMessage = 'This email is already used. Please try again.';
          }
        }
      });
    }
  }

  deleteMember(id: number) {
    if (confirm('Do you really want to delete this member?')) {
      this.apiService.deleteMember(id).subscribe(() => this.loadMembers());
    }
  }

  openModal(member?: Member) {
    this.isEditMode = !!member;

    if (member) {
      this.currentMember = { ...member };
    } else {
      this.currentMember = { id: 0, firstname: '', lastname: '', email: '' };
    }

    const modalElement = document.getElementById('memberModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    } else {
      console.error('Modal element with id "memberModal" not found.');
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}
