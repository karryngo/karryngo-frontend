import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.scss']
})
export class ViewServicesComponent implements OnInit {
  slug: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
    // console.log(this.slug);
  }

}
