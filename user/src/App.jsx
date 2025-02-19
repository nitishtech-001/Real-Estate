import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Listing from "./pages/Listing";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
