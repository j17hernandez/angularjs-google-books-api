import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './components/shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/Home/pages.component';


const routes: Routes = [
  { path: '', component: PagesComponent},
  { path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
