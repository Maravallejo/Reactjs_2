import { json } from "@remix-run/node";
import {
  Form,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css?url"; // para traer solo el css de las url
import { getContacts, createEmptyContact } from "./data";

export const loader = async () => {
  const contacts = await getContacts();// se almacena la data que traigo del backend
  return json({contacts}) //la data la vuelvo formato json y se retorna
}

export const links: LinksFunction = () => [ //importante 1 entrega
  { rel: "stylesheet", href:appStylesHref }
]

export default function App() {
  const {contacts} = useLoaderData<typeof loader>();
  return (
    <html lang="en">  
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
          {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                        {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>Sin Nombre</i>
                      )}{" "}
                      {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
            
          </nav>
        </div>
        <div id="detail">
          <Outlet />          
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
