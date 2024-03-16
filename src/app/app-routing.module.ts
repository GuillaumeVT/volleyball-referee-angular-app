import { AdminUsersComponent } from '@admin/pages/admin-users/admin-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminnGuard } from '@core/guards/admin.guard';
import { LoginGuard } from '@core/guards/login.guard';
import { PublicGuard } from '@core/guards/public.guard';
import { PageNotFoundComponent } from '@core/pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from '@core/pages/privacy-policy/privacy-policy.component';
import { GameComponent } from '@game/pages/game/game.component';
import { LeagueComponent } from '@league/pages/league/league.component';
import { SearchComponent } from '@search/pages/search/search.component';
import { UserColleaguesComponent } from '@user-data/pages/user-colleagues/user-colleagues.component';
import { UserGamesComponent } from '@user-data/pages/user-games/user-games.component';
import { UserLeaguesComponent } from '@user-data/pages/user-leagues/user-leagues.component';
import { UserRulesComponent } from '@user-data/pages/user-rules/user-rules.component';
import { UserTeamsComponent } from '@user-data/pages/user-teams/user-teams.component';
import { AccountComponent } from '@user-management/pages/account/account.component';
import { HomeComponent } from '@user-management/pages/home/home.component';
import { PasswordLostComponent } from '@user-management/pages/password-lost/password-lost.component';
import { PasswordResetComponent } from '@user-management/pages/password-reset/password-reset.component';
import { SignInComponent } from '@user-management/pages/sign-in/sign-in.component';
import { UnsubscriptionComponent } from '@user-management/pages/unsubscription/unsubscription.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'unsubscription', component: UnsubscriptionComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [PublicGuard] },
  { path: 'password-lost', component: PasswordLostComponent, canActivate: [PublicGuard] },
  { path: 'password-reset', component: PasswordResetComponent, canActivate: [PublicGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'account', component: AccountComponent, canActivate: [LoginGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'view/game/:gameId', component: GameComponent },
  { path: 'view/league/:leagueId', component: LeagueComponent },
  { path: 'colleagues', component: UserColleaguesComponent, canActivate: [LoginGuard] },
  { path: 'leagues', component: UserLeaguesComponent, canActivate: [LoginGuard] },
  { path: 'rules', component: UserRulesComponent, canActivate: [LoginGuard] },
  { path: 'teams', component: UserTeamsComponent, canActivate: [LoginGuard] },
  { path: 'games', component: UserGamesComponent, canActivate: [LoginGuard] },
  { path: 'games/league/:leagueId', component: UserGamesComponent, canActivate: [LoginGuard] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminnGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
