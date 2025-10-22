import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileCard from "../../components/ProfileCard";

test("renders profile card with correct details", () => {
  const fakeUser = {
    results: [
      {
        name: { first: "Jane", last: "Doe" },
        picture: { large: "avatar.jpg" },
        email: "jane@example.com",
        phone: "123-456",
        location: { city: "Waterloo", state: "ON" },
      },
    ],
  };

  render(<ProfileCard user={fakeUser} />);

  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  expect(screen.getByText("123-456")).toBeInTheDocument();
  expect(screen.getByText(/Waterloo, ON/)).toBeInTheDocument();
});
