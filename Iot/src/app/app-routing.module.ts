import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';


const routes: Routes = [
  { path: '', component: ProductoListaComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'producto', component: DashboardComponent, children: [
    {path: '', component: DashboardComponent},
    {path: ':id', component: DashboardComponent}
    ]},
  { path: 'lista', component: ProductoListaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
