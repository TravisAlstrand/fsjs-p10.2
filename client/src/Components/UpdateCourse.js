import { useEffect, useContext, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../context';

const UpdateCourse = () => {

    const { actions, user } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [ course, setCourse ] = useState({});
    const [ title, setTitle] = useState(course.title);
    const [ description, setDescription ] = useState(course.description);
    const [ estimatedTime, setEstimatedTime ] = useState(course.estimatedTime);
    const [ materialsNeeded, setMaterialsNeeded ] = useState(course.materialsNeeded);
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        // get course based on URL params
        const fetchCourse = async () => {
            await actions.getCourse(id)
                .then(response => {
                    if (response === null) { /* if a course is not found redirect to 404 page */
                        navigate('/notfound');
                    } else {
                        setCourse(response); /* set course state to response */

                        console.log(course);
                        
                        // if user is not course creator, redirect to forbidden
                        if (user.userId !== course.id) {
                            navigate('/forbidden');
                        }
                    }
                })
        };
        fetchCourse(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // actions that will happen when the form is submitted
    const handleSubmit = (e) => {
        // prevent page from reloading
        e.preventDefault();

        // object to send in PUT request
        const courseBody = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: user.userId
        };

        // call the update course function in context
        actions.updateCourse(courseBody, id)
            .then(response => {
                if (response.errors) { /* if there are validation errors, set them as errors state */
                    setErrors(response.errors);
                } else if (response === true) {
                    navigate(`/courses/${id}`); /* if successful, redirect to the course's detail page */
                }
            })
    };

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>

                {/* append validation errors if there are any */}
                {errors.length > 0 ? (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, index) => {
                                return (
                                    <li key={index}>{error}</li>
                                )
                            })}
                        </ul>
                    </div>
                ) : (
                    <></>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} onChange={e => setTitle(e.target.value)} />

                            <p>By {course.courseCreator?.firstName} {course.courseCreator?.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} onChange={e => setEstimatedTime(e.target.value)} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} onChange={e => setMaterialsNeeded(e.target.value)} />
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <Link to={`/courses/${id}`}>
                        <button className="button button-secondary">Cancel</button>
                    </Link>
                </form>
            </div>
        </main>
    );
};

export default UpdateCourse;