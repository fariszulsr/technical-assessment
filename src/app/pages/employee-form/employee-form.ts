import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModal } from '../../components/message-modal/message-modal';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { SelectModule } from 'primeng/select';

interface GroupOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MessageModal, MatIcon, MatSelectModule, FormsModule, NgxMatSelectSearchModule, SelectModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm implements OnInit, OnDestroy {
  registerForm: FormGroup | any;
  groupOption: GroupOption[] = [
    { id: 'A', name: 'A' },
    { id: 'B', name: 'B' },
    { id: 'C', name: 'C' },
    { id: 'D', name: 'D' },
    { id: 'E', name: 'R' },
    { id: 'F', name: 'F' },
    { id: 'G', name: 'G' },
    { id: 'H', name: 'H' },
    { id: 'I', name: 'I' },
    { id: 'J', name: 'J' },
  ];
  statusOption = ['Active', 'Inactive'];
  employees: any[] = [];
  modalTitle: any;
  modalMessage: any;
  messageType: any;
  typeButton = '';
  showModal = false;
  showCancel = true;
  today: string = '';
  groupFilterCtrl = new FormControl('');
  filteredGroupOption = this.groupOption;
  private _onDestroy = new Subject<void>();

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.formBuilder();
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
    this.groupFilterCtrl.valueChanges
      .pipe(debounceTime(200), takeUntil(this._onDestroy))
      .subscribe(search => {
        const filterValue = search?.toLowerCase() || '';
        this.filteredGroupOption = this.groupOption.filter(item =>
          item.name.toLowerCase().includes(filterValue)
        );
      });
  }

  formBuilder() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  isInvalid(field: string): boolean {
    const ctrl = this.registerForm.get(field);
    return !!ctrl && ctrl.touched && ctrl.invalid;
  }

  onSubmit() {
    const newEmployee = this.registerForm.value;
    this.employees.push(newEmployee);
    this.modalTitle = 'Berhasil';
    this.modalMessage = 'Data berhasil disimpan';
    this.messageType = 'success'
    this.showModal = true;
    this.showCancel = false;
  }

  confirmation(event: any) {
    this.typeButton = event;
    if (this.typeButton === 'submit') {
      if (this.registerForm.valid) {
        this.modalTitle = 'Konfirmasi';
        this.modalMessage = 'Apakah anda yakin untuk menyimpan data registrasi?';
        this.messageType = 'success'
        this.showModal = true;
      } else {
        this.registerForm.markAllAsTouched();
      }
    } else if (this.typeButton === 'cancel') {
      this.modalTitle = 'Konfirmasi';
      this.modalMessage = 'Apakah anda yakin untuk membatalkan registrasi?';
      this.messageType = 'fail'
      this.showModal = true;
    } else if (this.typeButton === 'logout') {
      this.modalTitle = 'Konfirmasi';
      this.modalMessage = 'Apakah anda yakin ingin Log Out?';
      this.messageType = 'edit'
      this.showModal = true;
    }
  }

  handleAfterOk() {
    if (this.typeButton === 'submit') {
      if (this.modalTitle === 'Berhasil') {
        this.router.navigate(['/employee-list']);
      } else {
        this.onSubmit();
      }
    } else if (this.typeButton === 'cancel') {
      this.router.navigate(['/employee-list']);
    } else if (this.typeButton === 'logout') {
      this.logout();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
