import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;

    constructor() { }

    ngOnInit() {
        this.tableData1 = {
            headerRow: ['ID', 'Type', 'Drivers', 'Start', 'Destination'],
            dataRows: [
                ['T000102620', 'Transport', 'Jean Jacke', 'Bangangte / 02:30PM', 'Yaounde'],
                ['C000102620', 'Carrier', 'Tagne Tomas', 'Douala / 10:00AM', 'Bafoussam'],
                ['S000102620', 'Shipper', 'Ngongang Yvan', 'Yaoundé / 05:AM', 'Ebolowa'],
                ['T001102620', 'Transport', 'Jean Jacke', 'Bangangte / 02:30PM', 'Yaounde'],
                ['C001102620', 'Carrier', 'Tagne Tomas', 'Douala / 10:00AM', 'Bafoussam'],
                ['S001102620', 'Shipper', 'Ngongang Yvan', 'Yaoundé / 05:AM', 'Ebolowa'],
            ]
        };
        this.tableData2 = {
            headerRow: ['ID', 'Type', 'Drivers', 'Start', 'Destination'],
            dataRows: [
                ['T000102620', 'Transport', 'Jean Jacke', 'Bangangte / 02:30PM', 'Yaounde'],
                ['C000102620', 'Carrier', 'Tagne Tomas', 'Douala / 10:00AM', 'Bafoussam'],
                ['S000102620', 'Shipper', 'Ngongang Yvan', 'Yaoundé / 05:AM', 'Ebolowa'],
                ['T001102620', 'Transport', 'Jean Jacke', 'Bangangte / 02:30PM', 'Yaounde'],
                ['C001102620', 'Carrier', 'Tagne Tomas', 'Douala / 10:00AM', 'Bafoussam'],
                ['S001102620', 'Shipper', 'Ngongang Yvan', 'Yaoundé / 05:AM', 'Ebolowa'],
            ]
        };
    }

}
