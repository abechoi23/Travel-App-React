import DestinationForm from "../components/DestinationForm";
import NavbarPage from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavbarPage />
      <div className="destinationForm">
        <h1>Travel Planner</h1>
        {user.loggedIn ? (
          <>
            <h3>Let us know where you plan to go</h3>
            <p>&</p>
            <h5>How long the trip will be</h5>
            <DestinationForm />
          </>
        ) : (
          <h3>Please log in to use the travel planner.</h3>
        )}
      </div>
    </>
  );
}
