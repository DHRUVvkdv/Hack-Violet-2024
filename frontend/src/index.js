import React from 'react'
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
// require('dotenv').config()
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!domain) {
//   throw new Error('Missing Publishable KeyDomain')
// }
// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//   <Auth0Provider
//     domain="dev-se4503ubrdrfcjal.us.auth0.com"
//     clientId="r7kJEryYteHdmZwDGTFx86BFoXF3ZqQ3"
//     authorizationParams={{
//       redirect_uri: window.location.origin,
//     }}
//   >
//     <App />
//   </Auth0Provider>
// )

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
// const root = ReactDOM.createRoot(document.getElementById('root'))
// document.addEventListener('DOMContentLoaded', () => {
//   const root = document.getElementById('root')
//   if (!root) {
//     console.error('Root container not found.')
//     return
//   }

//   ReactDOM.render(
//     <React.StrictMode>
//       <Auth0Provider
//         domain={domain}
//         clientId={client}
//         redirectUri={window.location.origin}
//       >
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </Auth0Provider>
//     </React.StrictMode>,
//     root
//   )
// })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Auth0Provider
        domain="dev-se4503ubrdrfcjal.us.auth0.com"
        clientId="r7kJEryYteHdmZwDGTFx86BFoXF3ZqQ3"
        redirectUri={window.location.origin}
      > */}
      {/* <ClerkProvider
        publishableKey={
          'pk_test_c3VwcmVtZS1yYXQtNjkuY2xlcmsuYWNjb3VudHMuZGV2JA'
        }
      > */}
      <App />
      {/* </ClerkProvider> */}
      {/* </Auth0Provider> */}
    </BrowserRouter>
  </React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
