import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context';

const CreateCourse = () => {

    const { actions, user } = useContext(Context);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setEstimatedTime ] = useState('');
    const [ materialsNeeded, setMaterialsNeeded ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/');
        }
    });


    const handleSubmit = (e) => {

        e.preventDefault();

        const courseBody = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: user.userId
        };

        actions.createCourse(courseBody)
            .then(response => {
                if (response === true) {
                    navigate('/');
                } else if (response.errors) {
                    setErrors(response.errors);
                }
            });
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                
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
                            <input id="courseTitle" name="courseTitle" type="text" onChange={e => setTitle(e.target.value)} />

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={e => setEstimatedTime(e.target.value)} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={e => setMaterialsNeeded(e.target.value)} />
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <Link to='/'>
                        <button className="button button-secondary" >Cancel</button>
                    </Link>
                </form>
            </div>
        </main>
    );
};

export default CreateCourse;