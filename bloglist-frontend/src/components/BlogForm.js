import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
    }

    return (
        <div>
            <h2>create new</h2>

            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>

                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={event => setAuthor(event.target.value)}
                    />
                </div>

                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={event => setUrl(event.target.value)}
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