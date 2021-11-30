import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import VideoCrud from "./pages/VideoCrud"
import Art from "./pages/Art";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CloudinaryUploadWidget from "./components/Upload";
import Mspaint from "./pages/Mspaint"
// import Profile from "./pages/Profile"
// Query and mutate models on localhost:3001/graphql
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="footer-positioning">
          <Header />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/upload">
            <CloudinaryUploadWidget />
          </Route>
          <Route exact path="/videos/:artId">
            <Art />
          </Route>
          <Route exact path="/videosCrud/:artId">
            <VideoCrud />
          </Route>
          <Route exact path="/mspaint">
            <Mspaint />
          </Route>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
