import { Routes, Route } from 'react-router-dom';

// Component imports
import Header from './Components/Header';
import Courses from './Components/Courses';

function App() {
  
  return (
    <>
      <Header />
      
      <Routes>
        <Route exact path='/' element={ <Courses /> } />
      </Routes>
    </>
  );
}

export default App;
