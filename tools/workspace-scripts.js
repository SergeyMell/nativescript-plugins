const npsUtils = require('nps-utils');

module.exports = {
	message: 'NativeScript Plugins ~ made with ❤️  Choose a command to start...',
	pageSize: 32,
	scripts: {
		default: 'nps-i',
		nx: {
			script: 'nx',
			description: 'Execute any command with the @nrwl/cli',
		},
		format: {
			script: 'nx format:write',
			description: 'Format source code of the entire workspace (auto-run on precommit hook)',
		},
		'🔧': {
			script: `npx cowsay "NativeScript plugin demos make developers 😊"`,
			description: '_____________  Apps to demo plugins with  _____________',
		},
		// demos
		apps: {
			'...Vanilla...': {
				script: `npx cowsay "Nothing wrong with vanilla 🍦"`,
				description: ` 🔻 Vanilla`,
			},
			demo: {
				clean: {
					script: 'nx run demo:clean',
					description: '⚆  Clean  🧹',
				},
				ios: {
					script: 'nx run demo:ios',
					description: '⚆  Run iOS  ',
				},
				android: {
					script: 'nx run demo:android',
					description: '⚆  Run Android  🤖',
				},
			},
			'...Angular...': {
				script: `npx cowsay "Test all the Angles!"`,
				description: ` 🔻 Angular`,
			},
			'demo-angular': {
				clean: {
					script: 'nx run demo-angular:clean',
					description: '⚆  Clean  🧹',
				},
				ios: {
					script: 'nx run demo-angular:ios',
					description: '⚆  Run iOS  ',
				},
				android: {
					script: 'nx run demo-angular:android',
					description: '⚆  Run Android  🤖',
				},
			},
		},
		'⚙️': {
			script: `npx cowsay "@sergeymell/* packages will keep your ⚙️ cranking"`,
			description: '_____________  @sergeymell/*  _____________',
		},
		// packages
		// build output is always in dist/packages
		'@sergeymell': {
			// @sergeymell/nativescript-svg
			'nativescript-svg': {
				build: {
					script: 'nx run nativescript-svg:build.all',
					description: '@sergeymell/nativescript-svg: Build',
				},
			},
			// @sergeymell/color-wheel
			'color-wheel': {
				build: {
					script: 'nx run color-wheel:build.all',
					description: '@sergeymell/color-wheel: Build',
				},
			},
			// @sergeymell/nativescript-color-wheel
			'nativescript-color-wheel': {
				build: {
					script: 'nx run nativescript-color-wheel:build.all',
					description: '@sergeymell/nativescript-color-wheel: Build',
				},
			},
			'build-all': {
				script: 'nx run all:build',
				description: 'Build all packages',
			},
		},
		'⚡': {
			script: `npx cowsay "Focus only on source you care about for efficiency ⚡"`,
			description: '_____________  Focus (VS Code supported)  _____________',
		},
		focus: {
			'nativescript-svg': {
				script: 'nx run nativescript-svg:focus',
				description: 'Focus on @sergeymell/nativescript-svg',
			},
			'color-wheel': {
				script: 'nx run color-wheel:focus',
				description: 'Focus on @sergeymell/color-wheel',
			},
			'nativescript-color-wheel': {
				script: 'nx run nativescript-color-wheel:focus',
				description: 'Focus on @sergeymell/nativescript-color-wheel',
			},
			reset: {
				script: 'nx run all:focus',
				description: 'Reset Focus',
			},
		},
		'.....................': {
			script: `npx cowsay "That's all for now folks ~"`,
			description: '.....................',
		},
	},
};
