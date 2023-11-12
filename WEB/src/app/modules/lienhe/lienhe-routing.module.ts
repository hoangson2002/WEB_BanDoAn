import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LienheComponent } from './lienhe.component';

const routes: Routes = [
  { path: '', component: LienheComponent, data: {  } },
  { path: 'lienhe', component: LienheComponent, data: {  } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LienheRoutingModule { }
