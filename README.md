
# Break it Down

A brief description of what this project does and who it's for:

Break It Down is a project management tool designed as a web application, optimized for responsiveness on both tablets and desktops. It enables teams to collaborate effectively and streamline their production processes. The application emphasizes an appealing design to offer a unique user experience.

	•	User-Friendly: Upon registration and login, users are immediately assigned as admins with access to the admin environment.
	•	Admin Features: Admins can create custom roles with varying permissions, add users, and assign roles.
	•	Project Management: Currently, an admin can create only one project (Note: This is required to enable all functionalities).
	•	Task Management: Users can create tasks and subtasks, assigning them to other users.
	•	Chat Functionality: Each task includes a chat feature (not live chat) for task-specific discussions.
	•	Personalization: Users can upload profile pictures to further customize their profiles.


## Installation

The project is deployed and can be tested on https://breakitdown.onrender.com/.

Local Installation

To use the application locally, follow these steps:

	1.	Clone the repository:
    git clone https://github.com/codeUWE/breakItDown.git
    cd breakItDown

    2.	Create a .env file in the backend directory with the following environment variables:
    MONGO_URI=
    JWT_SECRET=
    CLOUD_NAME=
    API_KEY=
    API_SECRET=
    Provide your own credentials for MongoDB, Cloudinary, and a custom JWT code.

    3.	Install dependencies and start the application:
    npm run install-all
    npm start

    Since the application uses Vite, you will get a terminal link like:
    ➜  Local:   http://localhost:5173/
## Requirements & Technologies

Requirements

	•	Node.js
	•	npm

Technologies

	•	React.js
	•	JavaScript
	•	TailwindCSS
	•	Express
	•	Node.js


## License

[MIT](https://choosealicense.com/licenses/mit/)

