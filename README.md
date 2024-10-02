1. Set Up Project Structure
Initialize a new Node.js project:
npm init -y
Set up the basic folder structure:
backend/
frontend/
In backend/, add controllers, models, routes, middleware, and config folders.
In frontend/, organize React components, context (state management), and services.
2. Backend Development with Node.js and MongoDB
A. User Authentication & Role Management
User Registration and Login with JWT:

Set up user registration and login endpoints (/register and /login).
Hash passwords using bcrypt.
Implement JWT authentication for login, and return a token to the client.
Create a middleware to protect routes (authMiddleware.js).
Use roles for role-based access (Admin vs Regular User).
Roles (Admin and User):

Create a Role schema and assign roles to users during registration.
Admins can manage users and tasks, while regular users can only manage their own tasks.
Middleware for Role-Based Authorization:

Create middleware that checks the role of the user to ensure only authorized users can perform certain actions (e.g., only Admin can manage users).
B. Task Management API
CRUD Operations for Tasks:

Create routes and controllers for creating, reading, updating, and deleting tasks.
Tasks will have fields like title, description, dueDate, status, category, etc.
Use the logged-in user's ID (req.user._id) to ensure users can only manage their own tasks.
Admins should have the ability to manage tasks for all users.
Task Due Dates and Status:

Add a dueDate field to the task schema.
Automatically mark tasks as "Overdue" if the due date has passed (use Mongoose pre-save middleware).
Task Filtering and Sorting:

Implement advanced query options to allow users to filter tasks by status, category, and sort by due date (e.g., /tasks?status=completed&sortBy=dueDate).
C. User Task Limits
Regular users can only create up to 10 tasks. Implement a check in the createTask controller to enforce this limit.
D. Password Reset Functionality
Password Reset via Email:
Create a password reset feature that sends an email with a reset link.
Store a reset token and expiration date in the database.
Use crypto to generate secure reset tokens.
Use NodeMailer or another service to send password reset emails.
Reset Token Validation:
Validate the reset token and allow the user to set a new password if the token is still valid.
E. Rate Limiting and Security:
Rate Limiting:
Implement rate limiting for the login route to prevent brute-force attacks (using express-rate-limit).
Security Enhancements:
Use Helmet.js to add security headers to your Express app (e.g., for preventing cross-site scripting, clickjacking, etc.).
Use environment variables (.env) to store sensitive information like JWT secret keys, database URIs, and email service credentials.
