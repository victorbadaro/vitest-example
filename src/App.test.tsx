import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

const fetchMock = vitest.fn(() => Promise.resolve({
	...global.fetch.prototype,
	json: () => Promise.resolve({ cep: '00000-000', uf: 'SP' })
}));

global.fetch = fetchMock;

beforeEach(() => {
	fetchMock.mockClear();
});

describe('<App />', () => {
	it('Should render it', () => {
		const { container } = render(<App />);

		expect(container).toBeInTheDocument();
	});

	it('Should call console.log function passing a string after submitting the form', async () => {
		const spy = vitest.spyOn(console, 'log').mockImplementation(() => {});
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
		const spy = vitest.spyOn(console, 'log').mockImplementation(() => {});
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

	it("Should call console.log function passing It's São Paulo string", async () => {
		const spy = vitest.spyOn(console, 'log').mockImplementation(() => {});
		const { container } = render(<App />);
		const form = container.querySelector('form') as HTMLFormElement;
		const nameInput = form.querySelector('input[name=name]') as HTMLInputElement;
		const emailInput = form.querySelector('input[name=email]') as HTMLInputElement;
		const submitButton = form.querySelector('button') as HTMLButtonElement;

		await userEvent.type(nameInput, 'example1');
		await userEvent.type(emailInput, 'email@email.com');
		await userEvent.click(submitButton);

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/');
		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith("It's São Paulo");
	});

	it("Should call console.log function passing It's not São Paulo string", async () => {
		fetchMock.mockImplementation(() => Promise.resolve({
			...global.fetch.prototype,
			json: () => Promise.resolve({ cep: '11111-111', uf: 'MG' })
		}));

		const spy = vitest.spyOn(console, 'log').mockImplementation(() => {});
		const { container } = render(<App />);
		const form = container.querySelector('form') as HTMLFormElement;
		const nameInput = form.querySelector('input[name=name]') as HTMLInputElement;
		const emailInput = form.querySelector('input[name=email]') as HTMLInputElement;
		const submitButton = form.querySelector('button') as HTMLButtonElement;

		await userEvent.type(nameInput, 'example1');
		await userEvent.type(emailInput, 'email@email.com');
		await userEvent.click(submitButton);

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/');
		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith("It's not São Paulo");
	});

	it('Should render input errors after trying to submit the form without any content', async () => {
		const { container } = render(<App />);
		const form = container.querySelector('form') as HTMLFormElement;
		const submitButton = form.querySelector('button') as HTMLButtonElement;

		await userEvent.click(submitButton);

		const nameInputErrorElement = await screen.findByText('name is a required field');
		const emailInputErrorElement = await screen.findByText('email is a required field');

		expect(nameInputErrorElement).toBeInTheDocument();
		expect(emailInputErrorElement).toBeInTheDocument();
	});
});
