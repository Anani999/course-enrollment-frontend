const CreateVideo = () => {
    return( 
        <div style={{background:'white'}} className="container mt-4 p-4 rounded shadow ">
            <h2 className="mb-3">Create Video</h2>
            <div className="ad-videos-cc">
                <div className="upload-video-cc p-4 border rounded">
                    <form
                        action="http://localhost:5000/api/admin/video"
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <div className="row g-3 align-items-center mb-3">
                            <div className="col-md-4">
                                <div className="video-thumb-cc text-center mb-3">
                                    <img
                                        src=''
                                        alt="video thumbnail"
                                        className="img-thumbnail mb-2"
                                        width={200}
                                        height={130}
                                    />
                                    <label className="btn btn-outline-secondary">
                                        Upload Image
                                        <input
                                            id="video-thumbnail-input"
                                            type="file"
                                            accept="image/*"
                                            name="thumbnail"
                                            className="d-none"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <video
                                    width={200}
                                    height={130}
                                    controls
                                    src=''
                                    className="mb-2"
                                ></video>
                                <label className="btn btn-outline-secondary">
                                    Change Video
                                    <input
                                        type="file"
                                        name="video"
                                        accept="video/*"
                                        className="d-none"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <input
                                name="title"
                                className="form-control"
                                placeholder="Video title"
                                type="text"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="task"
                                className="form-control"
                                placeholder="Task"
                                type="text"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="videoNumber"
                                className="form-control"
                                placeholder="Video number"
                                type="number"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <select name="course_id" className="form-select">
                                <option value="674fe7a1793e6e1e5de99dcd">Basic Web Dev</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-success">
                            Upload Video
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateVideo;