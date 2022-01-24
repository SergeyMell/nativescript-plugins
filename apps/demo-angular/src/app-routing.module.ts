import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'nativescript-color-wheel', loadChildren: () => import('./plugin-demos/nativescript-color-wheel.module').then((m) => m.NativescriptColorWheelModule) },
	{ path: 'nativescript-sumsub', loadChildren: () => import('./plugin-demos/nativescript-sumsub.module').then((m) => m.NativescriptSumsubModule) },
	{ path: 'nativescript-svg', loadChildren: () => import('./plugin-demos/nativescript-svg.module').then((m) => m.NativescriptSvgModule) },
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
