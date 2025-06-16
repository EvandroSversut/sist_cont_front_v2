import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { authInterceptor } from './app/auth.interceptor';
import { HomeComponent } from './app/home/home.component';
import { UsuarioComponent } from './app/components/usuario/usuario.component';
import { PessoaFisicaComponent } from './app/components/pessoa-fisica/pessoa-fisica.component';
import { PessoaJuridicaComponent } from './app/components/pessoa-juridica/pessoa-juridica.component';
//import { ComprasComponent } from './app/components/compras/compras.component';

import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
});



/*
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter([
      { path: '', component: LoginComponent },
     // { path: 'usuario/:idPessoa', component: UsuarioComponent },
      { path: 'home', component: HomeComponent }, // 👈 aqui
      { path: 'pessoa-fisica', component: PessoaFisicaComponent }, // 👈 adicione esta rota
      { path: 'pessoa-juridica', component: PessoajuridicaComponent }, // 👈 adicione esta rota
      { path: 'usuario', component: UsuarioComponent } // 👈 opcional, se tiver tela de cadastro separada
    ])
  ]
});
    */