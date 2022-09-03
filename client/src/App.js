import { Routes, Route, Navigate } from 'react-router-dom';

// Component imports
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UpdateCourse from './Components/UpdateCourse';
import CreateCourse from './Components/CreateCourse';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import SignOut from './Components/SignOut';
import NotFound from './Components/NotFound';
import Error from './Components/Error';
import Forbidden from './Components/Forbidden';

function App() {
  
  return (
    <>
      <Header />

      <Routes>
        <Route exact path='/' element={ <Navigate replace to='/courses'/> } />
        <Route path='/courses' element={ <Courses /> } />
        <Route path='/courses/create' element={ <CreateCourse /> } />
        <Route path='/courses/:id/update' element={ <UpdateCourse /> } />
        <Route path='/courses/:id' element={ <CourseDetail /> } />
        <Route path='/signin' element={ <SignIn /> } />
        <Route path='/signup' element={ <SignUp /> } />
        <Route path='/signout' element={ <SignOut /> } />
        <Route path='/notfound' element={ <NotFound /> } />
        <Route path='/error' element={ <Error /> } />
        <Route path='/forbidden' element={ <Forbidden /> } />
      </Routes>
    </>
  );
}

export default App;
