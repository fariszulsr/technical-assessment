import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MessageModal } from '../../components/message-modal/message-modal';
import { EmployeeDetailModal } from '../../components/employee-detail-modal/employee-detail-modal';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon, MessageModal, EmployeeDetailModal],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss'
})
export class EmployeeList implements OnInit {

  employees: any[] = [];
  filteredEmployees: any[] = [];
  showModal = false;
  showCancel = true;
  showDetailModal = false;
  modalTitle: any;
  modalMessage: any;
  messageType: any;
  dataEmployee: any;
  selectedEmployee: any;

  filter = {
    username: '',
    email: '',
    status: '',
    group: ''
  };

  groupOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  statusOption = ['Active', 'Inactive'];

  currentPage = 1;
  pageSize = 10;

  constructor(private auth: AuthService, private router: Router, private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.employeeService.getEmployees().subscribe(data => {
      data.forEach((e: any) => {
        this.employees.push(e.employee);
      });
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredEmployees = this.employees.filter(e =>
      (!this.filter.username || e.username.toLowerCase().includes(this.filter.username.toLowerCase())) &&
      (!this.filter.email || e.email.toLowerCase().includes(this.filter.email.toLowerCase())) &&
      (!this.filter.status || e.status === this.filter.status) &&
      (!this.filter.group || e.group === this.filter.group)
    );
    this.currentPage = 1;
  }

  confirmation(event: any, type: any) {
    this.dataEmployee = event;
    if (type === 'edit') {
      this.modalTitle = 'Konfirmasi';
      this.modalMessage = 'Apakah anda yakin ingin mengedit data?';
      this.messageType = 'edit'
    } else if (type === 'delete') {
      this.modalTitle = 'Konfirmasi';
      this.modalMessage = 'Apakah anda yakin ingin menghapus data?';
      this.messageType = 'delete'
    } else if (type === 'logout') {
      this.modalTitle = 'Konfirmasi';
      this.modalMessage = 'Apakah anda yakin ingin Log Out?';
      this.messageType = 'logout'
    }
    this.showModal = true;
  }

  handleAfterOk() {
    if (this.messageType === 'delete') {
      this.employees = this.employees.filter(e => e !== this.dataEmployee);
      this.applyFilter();
    } else if (this.messageType === 'logout') {
      this.logout();
    }
  }

  viewDetail(event: any) {
    this.selectedEmployee = event;
    this.showDetailModal = true;
  }

  addEmployee() {
    this.router.navigate(['/employee-form']);
  }

  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
