import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: "",
    component: HomePage,
    children: [
      {
        path: "profile",
        loadChildren: () => import("../tabs/profile/profile.module").then(m => m.ProfilePageModule)
      },
      {
        path: "map",
        loadChildren: () => import("../tabs/map/map.module").then(m => m.MapPageModule)
      },
      {
        path: '',
        redirectTo: "/home/map",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
