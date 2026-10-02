const API_URL = "http://localhost:8080/api";

// For now, use the user ID you tested successfully in Postman.
// Your Postman test used userId = 11.
let currentUserId = 11;


// ==========================================
// SECTION NAVIGATION
// ==========================================

function hideAllSections() {
    document.getElementById("postsSection").style.display = "none";
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "none";
}

function showPosts() {
    hideAllSections();
    document.getElementById("postsSection").style.display = "block";
    loadPosts();
}

function showLogin() {
    hideAllSections();
    document.getElementById("loginSection").style.display = "block";
}

function showRegister() {
    hideAllSections();
    document.getElementById("registerSection").style.display = "block";
}


// ==========================================
// SECURITY - ESCAPE HTML
// ==========================================

function escapeHtml(text) {

    if (text === null || text === undefined) {
        return "";
    }

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================
// LOAD ALL POSTS
// GET /api/posts
// ==========================================

async function loadPosts() {

    const postsContainer =
        document.getElementById("posts");

    postsContainer.innerHTML =
        "<p>Loading posts...</p>";

    try {

        const response =
            await fetch(`${API_URL}/posts`);

        if (!response.ok) {
            throw new Error("Failed to load posts");
        }

        const posts =
            await response.json();

        postsContainer.innerHTML = "";

        if (!posts || posts.length === 0) {

            postsContainer.innerHTML =
                "<p>No posts available.</p>";

            return;
        }


        // Display every post
        posts.forEach(post => {

            const postDiv =
                document.createElement("div");

            postDiv.className = "post";

            postDiv.innerHTML = `

                <h3>
                    ${escapeHtml(
                        post.title || "Untitled Post"
                    )}
                </h3>

                <p>
                    ${escapeHtml(
                        post.content || "No content"
                    )}
                </p>

                <small>
                    Post ID: ${post.id}
                </small>

                <br><br>

                <button onclick="loadComments(${post.id})">
                    View Comments
                </button>

                <div
                    id="comments-${post.id}"
                    class="comments">
                </div>

            `;

            postsContainer.appendChild(postDiv);

        });

    }

    catch (error) {

        console.error(
            "Error loading posts:",
            error
        );

        postsContainer.innerHTML = `

            <p>
                Unable to load posts.
                Make sure your Spring Boot application
                is running.
            </p>

        `;
    }
}


// ==========================================
// LOAD COMMENTS
// GET /api/posts/{postId}/comments
// ==========================================

async function loadComments(postId) {

    const commentsContainer =
        document.getElementById(
            `comments-${postId}`
        );

    commentsContainer.innerHTML =
        "<p>Loading comments...</p>";


    try {

        const response =
            await fetch(
                `${API_URL}/posts/${postId}/comments`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load comments"
            );
        }


        const comments =
            await response.json();


        commentsContainer.innerHTML = "";


        // No comments
        if (!comments || comments.length === 0) {

            commentsContainer.innerHTML =
                "<p>No comments yet.</p>";

        }

        else {

            // Display comments
            comments.forEach(comment => {

                const commentDiv =
                    document.createElement("div");

                commentDiv.className =
                    "comment";


                commentDiv.innerHTML = `

                    <p>
                        ${escapeHtml(
                            comment.content
                        )}
                    </p>

                    <small>
                        Comment ID: ${comment.id}
                    </small>

                `;

                commentsContainer.appendChild(
                    commentDiv
                );

            });

        }


        // Add comment input
        const commentInput =
            document.createElement("input");

        commentInput.type = "text";

        commentInput.placeholder =
            "Write a comment";

        commentInput.id =
            `comment-input-${postId}`;


        // Add comment button
        const addButton =
            document.createElement("button");

        addButton.innerText =
            "Add Comment";


        addButton.onclick =
            function () {

                addComment(postId);

            };


        commentsContainer.appendChild(
            document.createElement("br")
        );

        commentsContainer.appendChild(
            commentInput
        );

        commentsContainer.appendChild(
            document.createElement("br")
        );

        commentsContainer.appendChild(
            addButton
        );

    }

    catch (error) {

        console.error(
            "Error loading comments:",
            error
        );

        commentsContainer.innerHTML = `

            <p>
                Unable to load comments.
            </p>

        `;
    }
}


// ==========================================
// ADD COMMENT
// POST /api/posts/{postId}/comments/{userId}
// ==========================================

async function addComment(postId) {

    const input =
        document.getElementById(
            `comment-input-${postId}`
        );


    if (!input) {

        alert(
            "Comment input not found."
        );

        return;
    }


    const content =
        input.value.trim();


    if (!content) {

        alert(
            "Please enter a comment."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/posts/${postId}/comments/${currentUserId}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        content: content
                    })
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            console.error(
                "Comment error:",
                result
            );

            alert(
                "Failed to add comment."
            );

            return;
        }


        console.log(
            "Comment created:",
            result
        );


        alert(
            "Comment added successfully!"
        );


        // Clear input
        input.value = "";


        // Reload comments
        loadComments(postId);

    }

    catch (error) {

        console.error(
            "Add comment error:",
            error
        );

        alert(
            "Cannot connect to the backend."
        );
    }
}


// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================

async function login() {

    const username =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    if (!username || !password) {

        message.innerText =
            "Please enter username and password.";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );


        const result =
            await response.text();


        if (response.ok) {

            message.innerText =
                result;

        }

        else {

            message.innerText =
                "Login failed: " + result;
        }

    }

    catch (error) {

        console.error(
            "Login error:",
            error
        );

        message.innerText =
            "Cannot connect to the backend.";
    }
}


// ==========================================
// REGISTER
// POST /api/users/register
// ==========================================

async function register() {

    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    const message =
        document.getElementById(
            "registerMessage"
        );


    if (!name || !email || !password) {

        message.innerText =
            "Please fill all fields.";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/users/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );


        const result =
            await response.text();


        if (response.ok) {

            message.innerText =
                result;

            // Clear fields
            document.getElementById(
                "registerName"
            ).value = "";

            document.getElementById(
                "registerEmail"
            ).value = "";

            document.getElementById(
                "registerPassword"
            ).value = "";

        }

        else {

            message.innerText =
                "Registration failed: " + result;
        }

    }

    catch (error) {

        console.error(
            "Registration error:",
            error
        );

        message.innerText =
            "Cannot connect to the backend.";
    }
}