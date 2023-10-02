export const POST = async ({ request }) => {
	const { category, keywords } = await request.json();
	switch (category) {
		case 'work':
			break;
		case 'person':
			break;
		case 'business':
			break;
	}
};
