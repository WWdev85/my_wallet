import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppHeader, Navigation } from './components';
import { Main, Operations } from './pages';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';



export interface RouteInterface {
  name: string;
  path: string;
}

const routes: RouteInterface[] = [
  {
    name: 'Podsumowanie',
    path: '/main'
  },
  {
    name: 'operacje',
    path: '/operations'
  }
]


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <AppHeader />
        <Router>
          <Navigation routes={routes} />
          <Routes>
            <Route path="/" element={<Navigate to="/operations" />} />
            <Route path='/main' element={<Main />} />
            <Route path='/operations' element={<Operations />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
