import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { MessageModal } from '../../components/message-modal/message-modal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageModal],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';
  password = '';
  showModal = false;
  modalTitle: any;
  modalMessage: any;
  messageType: any;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.logout();
  }

  onSubmit() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/employee-list']);
    } else {
      this.modalTitle = 'Login Gagal';
      this.modalMessage = 'Username atau Password salah';
      this.messageType = 'fail'
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
