# File upload
File uploads use the `multipart/form-data` request format. Express does not
parse this format by itself, so a middleware such as `multer` is commonly used.

# Basic upload
Install multer and limit the upload before storing it:

```sh
npm install multer
```

```js
import multer from "multer";

const upload = multer({
		dest: "uploads/",
		limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/profile-picture", upload.single("picture"), (req, res) => {
		res.status(201).json({
				filename: req.file.filename,
				size: req.file.size,
		});
});
```

The form field name in this example is `picture`. A client can send it with
`curl -F picture=@photo.jpg http://localhost:3000/profile-picture`.

# Things to remember
- Validate the file size, MIME type, and file contents. Do not trust only the
	filename or the client-provided MIME type.
- Generate a server-side filename and do not use user input as a filesystem
	path.
- Store uploads outside the source tree, or use object storage in production.
- Do not serve uploaded files as executable code.
- Return a useful error when the file is missing or exceeds the limit.
- Consider virus scanning and access control for sensitive files.
