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


  gOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.apiService.getMembers().subscribe(data => this.members = data);
  }

  submit() {
    if (this.isEditMode) {
      this.apiService.updateMember(this.currentMember).subscribe(() => this.loadMembers());
    } else {
      this.apiService.addMember(this.currentMember).subscribe(() => this.loadMembers());
    }
    this.modalInstance.hide();
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
}
