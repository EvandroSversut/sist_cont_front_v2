import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PessoaFisicaComponent } from './components/pessoa-fisica/pessoa-fisica.component';
import { PessoaJuridicaComponent } from './components/pessoa-juridica/pessoa-juridica.component';
import { authGuard } from './guard/auth.guard';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ProdutoComponent } from './components/produtos/produto.component';
import { NfeComponent } from './components/nfe/nfe.component';
import { IbgeFormComponent } from './components/ibge/ibge-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [

  //  Rotas liberadas:
  { path: '', component: LoginComponent },
   { path: 'usuario', component: UsuarioComponent },
  // 🔐 Rotas protegidas:
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'pessoa-fisica', component: PessoaFisicaComponent, canActivate: [authGuard] },
  { path: 'pessoa-juridica', component: PessoaJuridicaComponent, canActivate: [authGuard] },
  { path: 'compras', component: ComprasComponent, canActivate: [authGuard] },
  { path: 'produtos', component: ProdutoComponent, canActivate: [authGuard] },
  { path: 'nfe', component: NfeComponent },
   { path: 'ibge', component: IbgeFormComponent },
  { path: '', redirectTo: 'nfe', pathMatch: 'full' }
];

// estudei melhor e vi que não é extamente isso que escrevi
// embaixo, pois so precisa disso se o component estiver fora da rota

/******************** I M P O R T A N T E ***********************/
/* PARA QUE A ROTA DÊ CERTO AO COLOCAR O LINK, POR EXEMPLO, NO MENU,
TEM QUE FAZER O IMPORT DO COMPONENT NA CLASSE MAIN, MESMO QUE O
IMPORT PAREÇA ESTA INUTILIZADO PORQUE FICA COM UMA COR ACINZENTADA 
(IMPORT NO MAIN), ELE PRECISA ESTA LÁ  */