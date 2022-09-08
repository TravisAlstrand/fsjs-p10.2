import { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Context } from '../context';

const CourseDetail = () => {

    const { actions, user } = useContext(Context);
    const [ course, setCourse ] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // get course based on URL params
        const fetchCourse = async () => {
            await actions.getCourse(id)
                .then(response => {
                    if (response === null) {
                        navigate('/notfound'); /* if no course was found, redirect to 404 page */
                    } else {
                        setCourse(response); /* if successful, set course state */
                    }
                })
        };
        fetchCourse(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // actions to delete course
    const deleteCourse = () => {
        actions.deleteCourse(course.id)
            .then(response => {
                if (response === true) {
                    navigate('/'); /* if successfull redirect to homepage */
                }
            })
    }

    if (course !== null) {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {/* if the current user is the course owner, show these buttons */}
                        { user !== null && user.userId === course.userId ? (
                                <>
                                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                    <button className="button" href='/' onClick={deleteCourse}>Delete Course</button>
                                </>
                            ) : (
                                <></>
                            )}
                        
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
                
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>By {course.courseCreator?.firstName} {course.courseCreator?.lastName}</p>
    
                                <ReactMarkdown>{course.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>
    
                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ReactMarkdown className="course--detail--list">{course.materialsNeeded}</ReactMarkdown>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
};

export default CourseDetail;