import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './blog/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { PostCreateComponent } from './blog/post-create/post-create.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard], data: { role: 'ROLE_AUTHOR' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
