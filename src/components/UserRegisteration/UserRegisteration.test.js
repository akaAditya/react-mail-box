import { render as rtlRender, screen } from "@testing-library/react";
import UserRegisteration from "./UserRegisteration";
import { Provider } from "react-redux";
import store from "../../store/redux-store";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

test("render signUp credentials", async () => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    json: async () => [
      {
        email: "test@jest.com",
        password: "123@123#",
        confirmPassword: "123@123#",
      },
    ],
  });
  render(<UserRegisteration />);
  const listsignUpElements = await screen.findAllByRole("form");
  expect(listsignUpElements).not.toHaveLength(0);
});
test("testing user sign up", async () => {
  render(<UserRegisteration />);
  const emailLabel = screen.getByText(/Email/i);
  expect(emailLabel).toBeInTheDocument();

  const passwordLabel = screen.getByText(/Password/i);
  expect(passwordLabel).toBeInTheDocument();

  const confirmPasswordLabel = screen.getByText(/Confirm Password/i);
  expect(confirmPasswordLabel).toBeInTheDocument();

  const emailLabelHandler = screen.getByLabelText(/Email/i);
  expect(emailLabelHandler).toHaveAttribute("type", "text");

  const passwordLabelHandler = screen.getByLabelText(/Password/i);
  expect(passwordLabelHandler).toHaveAttribute("type", "text");
});
test("testing user sign up another way", () => {
  render(<UserRegisteration />);
  const { emailLabel } = screen.getAllByText(/Email/i, { exact: false });
  expect(emailLabel).toContain();

  // const passwordLabel =  screen.getByText(/Password/i)
  // expect(passwordLabel).toBeInTheDocument();

  const confirmPasswordLabel = screen.getAllByText(/Password/i, {
    exact: false,
  });
  expect(confirmPasswordLabel).toContain();

  const emailLabelHandler = screen.getAllByLabelText(/Email/i, {
    exact: false,
  });
  expect(emailLabelHandler).toContain("type", "email");

  const passwordLabelHandler = screen.getAllByLabelText(/Password/i, {
    exact: false,
  });
  expect(passwordLabelHandler).toContain("type", "password");
});
