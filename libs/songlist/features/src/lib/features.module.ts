import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserDetail } from './user/user-detail/user-detail.component';
import { ListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/user.service';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  declarations: [AboutComponent, UserDetail, ListComponent, UserEditComponent],
  providers: [UserService],
  exports: [UserDetail, ListComponent, AboutComponent],
})
export class FeaturesModule {}
