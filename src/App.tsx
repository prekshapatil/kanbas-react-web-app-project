import HelloWorld from './Labs/a3/HelloWorld';
import Labs from './Labs';
import Kanbas from './Kanbas';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Labs" />} />
        <Route path="/Labs/*"  element={<Labs />}/>
        <Route path="/Kanbas/*"  element={<Kanbas />}/>
        <Route path="/HelloWorld"  element={<HelloWorld />}/>
      </Routes>
    </HashRouter>
  )
}


export default App;
