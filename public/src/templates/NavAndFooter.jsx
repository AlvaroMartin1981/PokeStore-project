
"use client";

import{ Link} from "react-router-dom";
import { Navbar } from "flowbite-react";

function NavAndFooter({Children}) {
  return (
  <>
    <Navbar fixed="top" fluid rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link to={`/Home`}>
          Home
        </Navbar.Link>
        <Navbar.Link  href={`/pokemon`}>
          Pokemon
        </Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    {Children}

    </>
  );
}
export default NavAndFooter