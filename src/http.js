export async function updateUserPlaces(places) {
	let response = await fetch('http://localhost:3000/user-places', {
		method: 'PUT',
		body: JSON.stringify({ places }),
		header: {
			'Content-type': 'application/json',
		},
	});

	const resData = await response.json();

	if (!response.ok) {
		throw new Error('Failed to update user data');
	}

	return resData.message;
}
