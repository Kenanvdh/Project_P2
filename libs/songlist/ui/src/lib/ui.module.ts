import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule, RouterLink],
  declarations: [NavComponent, FooterComponent],
  exports: [NavComponent, FooterComponent],
})
export class UiModule {}
