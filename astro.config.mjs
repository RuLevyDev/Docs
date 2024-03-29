import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'RubenLevy Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
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
			],
		}),
	],
});
