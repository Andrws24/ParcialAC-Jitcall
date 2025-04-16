import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module'; // Importamos el módulo de routing
import { HomePage } from './home.page'; // Importamos el componente standalone

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, // Asegúrate de importar el módulo de routing
    HomePage // Aquí importamos el componente standalone
  ]
})
export class HomePageModule {}
