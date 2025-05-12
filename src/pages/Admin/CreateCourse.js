import { useState, useContext } from 'react';

// import './CreateCourse.css';
import api from '../../api';
import { AuthContext } from '../../Context/AuthContext';
import CreateVideo from './CreateVideo';

const CreateCourse = ({ itsCourse, Course }) => {
    return (
    <>
    <div
        className={`container mt-4 p-4 rounded shadow `}
        style={{ background: '#ffffff' }}
    >
        <h1 className="mb-4 text-center">
            {itsCourse ? `Edit Course: ${Course?.title}` : 'Create Course'}
        </h1>
        
        <div className="content-up-cc">
            <form
                action="http://localhost:5000/api/admin/course"
                method="POST"
                encType="multipart/form-data"
                className="mb-4"
            >
                <div className="inputs-up-cc mb-3">
                    <input
                        required
                        name="title"
                        className="form-control mb-3"
                        placeholder="Name of the Course"
                    />
                    <textarea
                        name="description"
                        required
                        className="form-control mb-3"
                        placeholder="Description of the course"
                        rows={4}
                    ></textarea>
                </div>

                <div
                    className="thumbnail-up-cc p-3 mb-4 text-center border border-dashed rounded"
                    style={{ borderColor: 'gray' }}
                >
                    <img
                        width={200}
                        height={130}
                        className="mb-3 img-thumbnail"
                        src=''
                        alt="thumbnail"
                    />
                    <div className="to-up-cc">
                        <div className="to-co">
                            <label className="btn btn-outline-secondary">
                                Upload Thumbnail
                                <input
                                    name="thumbnail"
                                    required
                                    accept='image/*'
                                    id="thumbnail-input"
                                    type="file"
                                    className="d-none"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-4">
                        <input
                            name="experienceLevel"
                            required
                            className="form-control"
                            placeholder="Experience level"
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            name="duration"
                            required
                            className="form-control"
                            placeholder="Duration"
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            name="category"
                            required
                            className="form-control"
                            placeholder="Category"
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-4">
                    {itsCourse ? 'Update Course' : 'Create Course'}
                </button>
            </form>
        </div>
    </div>
    <CreateVideo/>
    </>
    );
};

export default CreateCourse;
