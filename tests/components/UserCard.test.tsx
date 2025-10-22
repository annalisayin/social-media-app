import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCard from "../../components/UserCard";
import { useRouter } from "next/router";

// mock next/link (Next.js 13+)
jest.mock(
  "next/link",
  () =>
    ({ children }: any) =>
      children
);
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("renders user info and saves on click", () => {
  const fakeUser = {
    login: { uuid: "abc123" },
    name: { first: "John", last: "Smith" },
    picture: { medium: "x.jpg" },
    location: { city: "Toronto", state: "ON" },
  };

  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });

  render(<UserCard user={fakeUser} />);

  expect(screen.getByText("John Smith")).toBeInTheDocument();
  fireEvent.click(screen.getByText("John Smith"));
});
