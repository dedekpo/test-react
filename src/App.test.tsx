import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders screen", () => {
	render(<App />);
	const linkElement = screen.getByText(/Universities Search/i);
	expect(linkElement).toBeInTheDocument();
});

test("search for country", async () => {
	render(<App />);
	const input = screen.getByPlaceholderText(/Insert country/i);

	await userEvent.type(input, "Brazil");

	userEvent.type(input, "{enter}");

	await waitFor(
		() => {
			const result = screen.getByText(
				/Centro Universitário Barao de Maua/i
			);
			expect(result).toBeInTheDocument();
		},
		{ timeout: 2000 }
	);
});
