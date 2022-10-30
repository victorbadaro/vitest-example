import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

describe('<App />', () => {
	it('Should render it', () => {
		const { container } = render(<App />);

		expect(container).toBeInTheDocument();
	});

	it('Should call console.log function passing a string after submitting the form', async () => {
		const spy = vitest.spyOn(console, 'log').mockImplementation(() => {}); // eslint-disable-line
		const { container } = render(<App />);
		const form = container.querySelector('form') as HTMLFormElement;
		const nameInput = form.querySelector('input[name=name]') as HTMLInputElement;
		const emailInput = form.querySelector('input[name=email]') as HTMLInputElement;
		const submitButton = form.querySelector('button') as HTMLButtonElement;

		await userEvent.type(nameInput, 'example1');
		await userEvent.type(emailInput, 'email@email.com');
		await userEvent.click(submitButton);

		expect(spy).toHaveBeenCalledWith('this is the first example');
	});

	it('Should call console.log function passing an object after submitting the form', async () => {
		const spy = vitest.spyOn(console, 'log').mockImplementation(() => {}); // eslint-disable-line
		const { container } = render(<App />);
		const form = container.querySelector('form') as HTMLFormElement;
		const nameInput = form.querySelector('input[name=name]') as HTMLInputElement;
		const emailInput = form.querySelector('input[name=email]') as HTMLInputElement;
		const submitButton = form.querySelector('button') as HTMLButtonElement;

		await userEvent.type(nameInput, 'example2');
		await userEvent.type(emailInput, 'email@email.com');
		await userEvent.click(submitButton);

		expect(spy).toHaveBeenCalledWith({
			name: 'example2',
			email: 'email@email.com'
		});
	});
});
