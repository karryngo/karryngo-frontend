import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from '../../../../shared/entity/vehicle';
import { VehicleService } from '../../../../shared/service/back-office/vehicle.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

declare var $: any;

@Component({
    selector: 'app-vehicles',
    templateUrl: 'vehicles.component.html',
    styleUrls: ['vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
    
    @Output() handleVehicle = new EventEmitter<Vehicle>();
    vehicleForm: FormGroup;
    submitted: boolean;
    list_brands: any[] = [];
    // listVehicle:Vehicle[]=[];
    selectedFiles: string[] = [];
    
    constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private vehicleService:VehicleService,
    private sanitizer: DomSanitizer
    ){}

    //This method is used to Add a vehicle
    submit(){
    console.log(this.vehicleForm.valid)
    console.log(this.vehicleForm.value)

    if(!this.vehicleForm.valid){
        this.toastr.error("Please fill the required fields", "Error");
        return;
    }

    let p: Vehicle = Vehicle.hydrate(this.vehicleForm.value);
console.log(Vehicle)
    VehicleService.currentVehicle = p;
    this.submitted=true;
    this.addNewVehicle(this.vehicleForm.value);
    this.submitted=false;
    this.vehicleForm.reset()
    this.selectedFiles = [];
    this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Vehicle was added successfully')

    // this.vehicleService.vehicleCreation(p).then((rep:any)=>{
    //     this.submitted=false;
    //     console.log(rep);
    //     this.addNewVehicle(rep.result);
    //     this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Vehicle was added successfully')
    //     // setTimeout(() => {
    //     //   this.router.navigate(['/carrier/vehicles'])
    //     // }, 600);

    // }).catch((error)=>{
    //     // console.log(error)
    //     this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>'+error.message)
    //     this.submitted=false;
    // });

    }

    //Get list of brands
    getListOfbrands(){
    this.vehicleService.getBrandOfVehicle().subscribe(rep=>{
        this.list_brands =rep;
    });
    }

    ngOnInit(): void {

    // this.getListOfbrands();
    this.vehicleForm = this.formBuilder.group({
        'marque': ['', Validators.required],
        // 'field_regnumber': ['', Validators.required],
        // 'field_year': ['', Validators.required],
        'name': ['', Validators.required],
        'type': ['', Validators.required],
        'field_placeNumber': ['1', Validators.required],
        // 'field_fieles': ['', Validators.required],
        'description': ['', Validators.required],
        'plate_number': ['', Validators.required],
        'photo': ['',],
    });

    // this.vehicleService.vehicleSubject.subscribe((vehicleList)=>{
    //   this.listVehicle=vehicleList
    //   console.log("Vehicule ",vehicleList)
    // });
    // this.vehicleService.emitVehicle();
    }

    handleFileInput(event: any) {
        const files = event.target.files;
        // const base64Images: string[] = [];
    
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const base64Image = e.target.result;
                    this.selectedFiles.push(base64Image as string);
    
                    // Check if all files have been processed
                    if (this.selectedFiles.length === files.length) {
                        // Assign the array of base64 images to the 'photo' field of the form
                        this.vehicleForm.get('photo').setValue(this.selectedFiles);
                    }
                };
                fileReader.readAsDataURL(files[i]);
            }
        }
    }

    sanitizeUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    // Method to remove an image
    removeImage(index: number) {
        this.selectedFiles.splice(index, 1);
    }
    
    

    // handleFileInput(event) {
    //     let i=0
    //     const files = event.target.files;
    //     const fileReader = new FileReader();
    
    //     fileReader.onload = (e) => {
    //         const base64Image = e.target.result;
    //         // You can save the Base64 image string to a variable or send it to a server
    //         console.log(i+1);
    //     };
    
    //     // Read the selected file(s) as Data URL
    //     for (let i = 0; i < files.length; i++) {
    //         fileReader.readAsDataURL(files[i]);
    //     }
    // }

    //This method is used to add vehicle
    addNewVehicle(value: any) {
        this.handleVehicle.emit(value);
    }

    //This method is used to display notification
    showNotification(from, align, colortype, icon, text) {

    $.notify({
        icon: icon,
        message: text
    }, {
        type: colortype,
        timer: 1000,
        placement: {
        from: from,
        align: align
        }
    });
    }
}
