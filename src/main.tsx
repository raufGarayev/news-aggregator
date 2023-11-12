import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.sass'
import { HashRouter } from 'react-router-dom'
import UserProvider from './context/UserContext.tsx'
import { Provider } from 'react-redux'
import store from './redux/store'


ReactDOM.createRoot(document.getElementById('root')!).render(

    <React.StrictMode>
      <Provider store={store}>
        <UserProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </UserProvider>
      </Provider>
    </React.StrictMode>
)
