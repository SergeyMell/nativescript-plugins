import { Component } from '@angular/core';

@Component({
	selector: 'demo-home',
	templateUrl: 'home.component.html',
})
export class HomeComponent {
	demos = [
		{
			name: 'nativescript-color-wheel',
		},
		{
			name: 'nativescript-svg',
		},
	];
}
