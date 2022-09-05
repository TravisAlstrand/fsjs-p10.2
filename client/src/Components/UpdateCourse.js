import { useContext, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../context';

const UpdateCourse = () => {

    const { actions, course } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [ title, setTitle] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ estTime, setEstTime ] = useState('');
    const [ matNeeded, setMatNeeded ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const courseBody = {
            title,
            desc,
            estTime,
            matNeeded
        };

        actions.updateCourse(courseBody, id)
            .then(response => {
                if (response === true) {
                    navigate(`/courses/${id}`);
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
                            <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} onChange={e => setDesc(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} onChange={e => setEstTime(e.target.value)} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} onChange={e => setMatNeeded(e.target.value)} />
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