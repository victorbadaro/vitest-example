import { useFormik } from 'formik';
import * as Yup from 'yup';

export function App() {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: ''
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
			email: Yup.string().email().required()
		}),
		async onSubmit(values) {
			if(values.name === 'example1')
				console.log('this is the first example');
			else
				console.log(values);

			const result = await fetch('https://viacep.com.br/ws/01001000/json/');
			const data = await result.json();

			if(data.uf === 'SP')
				console.log("It's São Paulo");
			else
				console.log("It's not São Paulo");
		}
	});

	return (
		<>
			<h1>Vitest Example</h1>

			<form onSubmit={formik.handleSubmit} noValidate>
				<div>
					<input
						type="text"
						name="name"
						placeholder="Name"
						onChange={formik.handleChange}
						value={formik.values.name}
					/>
					{formik.touched.name && formik.errors.name && <span style={{ color: 'red' }}>{formik.errors.name}</span>}
				</div>

				<div>
					<input
						type="email"
						name="email"
						placeholder="Email"
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email && <span style={{ color: 'red' }}>{formik.errors.email}</span>}
				</div>

				<button type="submit">Save</button>
			</form>
		</>
	);
}
