import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Home } from "../Home";
import Chats from "../Chats";
import { Profile } from "../Profile";
import { NotFound } from "../NotFound";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/Profile", name: "Profile", Component: Profile },
  { path: "/Chats", name: "Chat Room", Component: Chats },
];

export const Routing = () => {
  return (
    <BrowserRouter>
      <>
        <Navbar bg="light">
          <Nav className="mx-auto">
            {routes.map((route) => (
              <Nav.Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                activeStyle={{ color: "green", fontWeight: "bold" }}
                exact
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar>

        <Container className="container">
          <Switch>
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                      <Component />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
            <Route path="/Chats/:chatId?" component={Chats}></Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Container>
      </>
    </BrowserRouter>
  );
};
