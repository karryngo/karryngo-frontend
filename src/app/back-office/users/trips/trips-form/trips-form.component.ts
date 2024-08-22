import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { PageFormComponent } from '../../../components/page-form/page-form.component';

@Component({
  selector: 'app-trips-form',
  templateUrl: './trips-form.component.html',
  styleUrls: ['./trips-form.component.scss']
})
export class TripsFormComponent extends PageFormComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  initialize(): void {
    this.endpoint = '';
    this.titleForm = 'Trip Form';
    this.icon = 'fas fa-car';
    super.initialize();
  }

  createForm(): void {
    this.form = this.fb.group({
      id: null,
      name: [null,
        [Validators.required]
      ],
      wikipediaLink: null,
      releaseDate: null,
      img: null,
      show: null,
      movie: null,
      fileName: null,
    });
    super.createForm();
  }

  resetForm(): void {
    this.item.id = null;
    this.item.driverName = null;
    this.item.places = null;
    this.item.startLocation = null;
    this.item.startDate = null;
    this.item.startTime = null;
    this.item.endLocation = null;
    this.item.endDate = null;
    this.item.endTime = null;
    this.item.fileName = null;
    this.item.img = null;
    // this.item.type = null;
    this.item.companyName = null;
    this.item.package = false;
    this.item.trips = true;
    super.resetForm();
  }

  setFormValue(item: any): void {
    this.form.controls.id.setValue(item.id);
    this.form.controls.driverName.setValue(item.driverName);
    // this.form.controls.type.setValue(item.type);
    this.form.controls.places.setValue(item.places);
    this.form.controls.startLocation.setValue(item.startLocation);
    this.form.controls.startDate.setValue(item.startDate);
    this.form.controls.startTime.setValue(item.startTime);
    this.form.controls.endLocation.setValue(item.endLocation);
    this.form.controls.endDate.setValue(item.endDate);
    this.form.controls.endTime.setValue(item.endTime);
    this.form.controls.fileName.setValue(item.fileName);
    this.form.controls.img.setValue(item.img);
    this.form.controls.companyName.setValue(item.companyName);
    this.form.controls.package.setValue(item.package);
    this.form.controls.trips.setValue(item.trips);
    super.setFormValue(item);
  }

  get name(): any {
    return this.form.get('name');
  }

}
