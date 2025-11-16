import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppointment } from '../../interfaces/appointment.interface';
import { AppointmentUtilsService } from '../../services/utils/appointment-utils.service';
import { AppointmentsTrxService } from '../../services/appointments-trx.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;

  formStep1!: FormGroup;
  formStep2!: FormGroup;
  formStep3!: FormGroup;
  appointmentResponse: any;

  get clientFormValues() {
    return this.formStep1.value;
  }

  get petFormValues() {
    return this.formStep2.value;
  }

  get appointmentFormValues() {
    return this.formStep3.value;
  }

  constructor(
    private fb: FormBuilder,
    private readonly activeModal: NgbActiveModal,
    private readonly utils: AppointmentUtilsService,
    private readonly appointmentTrx: AppointmentsTrxService
  ) {}

  ngOnInit(): void {
    this.formStep1 = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      address: [''],
    });

    this.formStep2 = this.fb.group({
      name: ['', Validators.required],
      specie: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      weight: ['', Validators.required],
    });

    this.formStep3 = this.fb.group({
      date: [''],
      hour: [''],
      type: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  nextStep(step: number): void {
    const currentForm = this.getCurrentForm();
    if (currentForm.valid) {
      this.currentStep++;
      window.scrollTo(0, 0);
    } else {
      currentForm.markAllAsTouched();
      alert('Por favor complete todos los campos requeridos (*)');
    }
  }

  prevStep(step: number): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo(0, 0);
    }
  }

  getCurrentForm(): FormGroup {
    switch (this.currentStep) {
      case 1:
        return this.formStep1;
      case 2:
        return this.formStep2;
      case 3:
        return this.formStep3;
      default:
        return this.formStep1;
    }
  }

  submitForm(): void {
    if (this.formStep1.valid && this.formStep2.valid && this.formStep3.valid) {
      const bodyRequest = this.buildBodyRequest();

      this.appointmentTrx.create(bodyRequest).subscribe({
        next: (response) => {
          this.currentStep = 4;
          this.appointmentResponse = response;
        },
      });
    }
  }

  private buildBodyRequest() {
    const clientForm = this.clientFormValues;
    const petForm = this.petFormValues;
    const appointmentForm = this.appointmentFormValues;
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    const bodyRequest = {
      userId: user.id,
      client: {
        name: clientForm.name,
        phone: clientForm.phone,
        email: clientForm.email,
        address: clientForm.address,
      },
      pet: {
        name: petForm.name,
        specie: Number(petForm.specie),
        breed: petForm.breed,
        age: Number(petForm.age),
        gender: Number(petForm.gender),
        weight: petForm.weight,
      },
      appointment: {
        date: appointmentForm.date,
        hour: appointmentForm.hour,
        type: Number(appointmentForm.type),
        comments: appointmentForm.comments,
      },
    };

    return bodyRequest;
  }

  resetForm() {
    const { appointment, pet, client } = this.buildBodyRequest();
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    this.activeModal.close({
      id: this.appointmentResponse?.id ?? 0,
      appointment: {
        date: new Date(appointment.date).toString(),
        hour: appointment.hour,
        comments: appointment.comments,
        status: 'pendiente',
        type: this.utils.getReason(appointment.type),
      },
      pet: {
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        gender: this.utils.getGender(pet.gender),
        weight: pet.weight,
        specie: this.utils.getSpecie(pet.specie),
      },
      veterinarian: {
        name: user.name,
        email: user.email,
      },
      client: {
        name: client.name,
        phone: client.phone,
        email: client.email,
      },
    } as IAppointment);
  }
}
