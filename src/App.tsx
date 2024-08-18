import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppHeader, Navigation } from './components';
import { Main } from './pages';
import './App.scss';


export interface RouteInterface {
  name: string;
  path: string;
}

const routes: RouteInterface[] = [
  {
    name: 'strona główna',
    path: '/main'
  },
  {
    name: 'operacje',
    path: '/operations'
  }
]

const appRoutes = routes.map((route: RouteInterface) => {
  return (
    <Route key={route.path} path={route.path} element={<Main />} />
  )
})



function App() {
  return (
    <div className="App">
      <AppHeader />
      <Router>
        <Navigation routes={routes} />
        <Routes>
          {appRoutes}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
