import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//import { SongListComponent } from "libs/songlist/features/src/lib/song/song-list/song-list.component";
//import { SongDetailComponent } from "libs/songlist/features/src/lib/song/song-detail/song-detail.component";
import { ListComponent } from "libs/songlist/features/src/lib/user/user-list/user-list.component";
import { UserDetail } from "libs/songlist/features/src/lib/user/user-detail/user-detail.component";
import { UserCreateComponent } from "libs/songlist/features/src/lib/user/user-edit/user-edit.component";
import { AboutComponent } from "libs/songlist/features/src/lib/about/about.component";

export const routes: Routes = [
    // { path: "", pathMatch: "full", redirectTo: "songlist" },
    // { path: "songlist", component: SongListComponent },
    { path: "about", pathMatch: "full", component: AboutComponent },
    { path: "users", pathMatch: "full", component: ListComponent },
    { path: "user/create", pathMatch: "full", component: UserCreateComponent },
    { path: "users/:id", pathMatch: "full", component: UserDetail },
    { path: "**", redirectTo: "users" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class appRoutes {}
