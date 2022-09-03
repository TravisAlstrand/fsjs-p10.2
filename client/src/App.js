import { Routes, Route, Navigate } from 'react-router-dom';

// Component imports
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UpdateCourse from './Components/UpdateCourse';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';
import Error from './Components/Error';
import Forbidden from './Components/Forbidden';

function App() {
  
  return (
    <>
      <Header />

      <Routes>
        <Route exact path='/' element={ <Navigate replace to='/courses'/> } />
        <Route exact path='/courses' element={ <Courses /> } />
        <Route path='/courses/:id' element={ <CourseDetail /> } />
        <Route path='/courses/:id/update' element={ <UpdateCourse /> } />
        <Route path='/signin' element={ <SignIn /> } />
        <Route path='/signup' element={ <SignUp /> } />
      </Routes>
    </>
  );
}

export default App;
