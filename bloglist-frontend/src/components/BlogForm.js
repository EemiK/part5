const BlogForm = ({ title, author, url, handlers, submit }) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handlers[0]}
                    />
                </div>

                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handlers[1]}
                    />
                </div>

                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={handlers[2]}
                    />
                </div>
            <div>
                <button type="submit">create</button>
            </div>
            </form>
        </div>
    )
}

export default BlogForm