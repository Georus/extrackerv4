/** @type {import('./$types').PageLoad} */

export function load({ params }) {
	return {
		exp: {
			id: params.slug
		}
	};
}
