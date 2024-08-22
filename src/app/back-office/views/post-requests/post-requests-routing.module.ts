import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostRequestColisComponent } from './post-request-colis/post-request-colis.component';
import { PostRequestColis0Component } from './post-request-colis/post-request-colis0/post-request-colis0.component';
import { PostRequestColis1Component } from './post-request-colis/post-request-colis1/post-request-colis1.component';
import { PostRequestRentComponent } from './post-request-rent/post-request-rent.component';
import { PostRequestRent0Component } from './post-request-rent/post-request-rent0/post-request-rent0.component';
import { PostRequestTrip0Component } from './post-request-trip/post-request-trip0/post-request-trip0.component';
import { PostRequestTrip1Component } from './post-request-trip/post-request-trip1/post-request-trip1.component';
import { PostRequestTripsComponent } from './post-request-trip/post-request-trips.component';
import { PostTravelColisComponent } from './post-travel-colis/post-travel-colis.component';
import { PostTravelColis0Component } from './post-travel-colis/post-travel-colis0/post-travel-colis0.component';
import { PostTravelColis1Component } from './post-travel-colis/post-travel-colis1/post-travel-colis1.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Post Requests'
    },
    children: [
      {
        path: '',
        redirectTo: 'packages'
      },
      {
        path: 'packages',
        component: PostRequestColisComponent,
        data: {
          title: 'Parcel'
        },
        children:[
          {
            path:'',
            redirectTo:'add'
          }, 
          {
            path: 'add',
            component:PostRequestColis0Component,
            pathMatch:'full'
          },
          {
            path: 'list-providers',
            component:PostRequestColis1Component,
            pathMatch:'full'
          },
        ]
      },
      {
        path: 'trips',
        component: PostRequestTripsComponent,
        data: {
          title: 'Trips'
        },
        children:[
          {
            path:'',
            redirectTo:'add/person'
          },
          {
            path: 'add/:slug',
            component:PostRequestTrip0Component,
            pathMatch:'full'
          },
          // {
          //   path: 'add/:slug/:service_id',
          //   component:PostRequestTrip0Component,
          //   pathMatch:'full'
          // },
          {
            path: 'list-providers',
            component:PostRequestTrip1Component,
            pathMatch:'full'
          },
        ]
      },
      {
        path: 'travellers',
        component: PostTravelColisComponent,
        data: {
          title: 'travellers'
        },
        children:[
          {
            path:'add/colis',
            component:PostTravelColis0Component,
            pathMatch:'full',
            // redirectTo:''
          },
          {
            path: 'cars',
            component:PostRequestTrip1Component,
            pathMatch:'full'
          },
        ]
      },
      {
        path: 'rents',
        component: PostRequestRentComponent,
        data: {
          title: 'Rental'
        },
        children:[
          {
            path:'add/cars',
            component:PostRequestRent0Component,
            pathMatch:'full',
            // redirectTo:''
          },
          {
            path: 'cars',
            component:PostRequestRent0Component,
            pathMatch:'full'
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRequestsRoutingModule {}
