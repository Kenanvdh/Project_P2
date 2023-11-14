import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterLink],
  declarations: [NavComponent],
  exports: [NavComponent],
})
export class UiModule {}
