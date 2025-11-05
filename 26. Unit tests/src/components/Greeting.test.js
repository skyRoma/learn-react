import { render, screen } from "@testing-library/react";
import { Greeting } from "./Greeting";
import userEvent from "@testing-library/user-event";

describe('Greeting component', () => {
  test('renders Hello World', () => {
    render(<Greeting />);
    const helloWorld = screen.getByText('Hello World!');

    expect(helloWorld).toBeInTheDocument();
  });

  test('renders "good to see you" if button was NOT clicked', () => {
    render(<Greeting />);
    const outputElement = screen.getByText('good to see you!', { exact: false });

    expect(outputElement).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText('Changed!');

    expect(outputElement).toBeInTheDocument();
  });

  test(`doesn't render "good to see you" if button was clicked`, async () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText('good to see you!', { exact: false });

    expect(outputElement).not.toBeInTheDocument();
  });
});

