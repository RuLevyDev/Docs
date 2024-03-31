import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'RubenLevy Docs',
			locales: {
				root: {
					label: 'Spanish',
					lang: 'Spanish', // lang is required for root locales
				},
				'en': {
					label: 'English',
					lang: 'English',
				},
			},
			social: {
				github: 'https://github.com/RuLevyDev',
				linkedin: 'https://linkedin.com/in/ruben-orero-levy',
			},

			sidebar: [
				// {
				// 	label: 'Guides',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Example Guide', link: '/guides/example/' },
				// 	],
				// },
				{
					label: 'Dart',
					autogenerate: { directory: 'dart' }
				},
				{
					label: 'Flutter',
					autogenerate: { directory: 'flutter' }
				},
				{
					label: 'Astro',
					autogenerate: { directory: 'astro' },
				},
				{
					label: 'Setup Terminal',
					autogenerate: { directory: 'terminal' }
				},
				{
					label: 'dotNet',
					autogenerate: { directory: 'dotNet' }
				},
				{
					label: 'tailwindcss',
					autogenerate: { directory: 'tailwindcss' }
				},
			],
		}),
	],
});
