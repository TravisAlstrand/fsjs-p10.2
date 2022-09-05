import { useEffect, useContext, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../context';

const UpdateCourse = () => {

    const { actions, course, user } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [ title, setTitle] = useState(course.title);
    const [ description, setDescription ] = useState(course.description);
    const [ estimatedTime, setEstimatedTime ] = useState(course.estimatedTime);
    const [ materialsNeeded, setMaterialsNeeded ] = useState(course.materialsNeeded);

    useEffect(() => {
        const fetchCourse = async () => {
            await actions.getCourse(id);
        }; 
        fetchCourse(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const courseBody = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: user.userId
        };

        actions.updateCourse(courseBody, id)
            .then(response => {
                if (response === true) {
                    navigate(`/courses/${id}`);
                } else if (response === 'no-auth') {
                    navigate('/forbidden');
                }
            })
    };

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} onChange={e => setTitle(e.target.value)} />

                            <p>By {course.courseCreator.firstName} {course.courseCreator.lastName}</p>

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