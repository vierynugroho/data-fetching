import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';
import ErrorBox from './ErrorBox.jsx';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true);

			try {
				const response = await fetch('http://localhost:3000/places');
				const resData = await response.json();

				// logic if error from backend (API)
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				setAvailablePlaces(resData.places);
			} catch (error) {
				setError({
					message: error.message || 'Something error! please try again later',
				});
			}
			setIsFetching(false);
		}

		fetchData();
	}, []);

	console.log(availablePlaces);

	if (error) {
		return (
			<ErrorBox
				title='An error occured!'
				message={error.message}
			/>
		);
	}

	return (
		<Places
			title='Available Places'
			isLoading={isFetching}
			loadingText={'Loading...'}
			places={availablePlaces}
			fallbackText='No places available.'
			onSelectPlace={onSelectPlace}
		/>
	);
}
