import { FormEvent, useState } from 'react';

export function App() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		console.log({ name, email });
	}

	return (
		<>
			<h1>Vitest Example</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					onChange={event => setName(event.target.value)}
					value={name}
				/>

				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={event => setEmail(event.target.value)}
					value={email}
				/>

				<button type="submit">Save</button>
			</form>
		</>
	);
}
