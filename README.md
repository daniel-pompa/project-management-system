# Project Management

A web application designed to streamline project and task management within a team environment. It supports user registration, account confirmation, and role-based authentication, ensuring that access to certain actions is restricted or granted based on user roles.

Project managers have the ability to create projects, manage team members, update or delete tasks, and monitor task histories for progress tracking.

All users can update their profile, including changing their name, email, and password.

Team developers can complete tasks, change task statuses, and add notes. However, only the note creator can delete their own notes, and team developers are restricted from editing or deleting projects or tasks—these permissions are reserved exclusively for the project manager.

For security purposes, deleting a project requires the project manager to confirm their identity by entering the password of the account that created the project.

## Table of Contents

1. [Requirements](#requirements)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Author](#author)

## Requirements

You need to have the following installed:

A source code editor such as [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), or any other editor of your choice.

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)

> [!NOTE]
> Clicking on the Node.js badge will take you to the Node.js website, where you can download the installer. It is recommended to use the stable version. When you install Node.js, npm will be installed automatically.

Check your Node.js and npm installation by running:

```bash
node --version
npm --version
```

## Technology Stack

<p>
  <img src="https://skillicons.dev/icons?i=react" alt="Node.js" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind CSS" width="40" height="40" />
</p>

- React: A popular JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that enhances code quality and maintainability.
- Tailwind CSS: A utility-first CSS framework for designing responsive and modern user interfaces quickly.

In addition to these core technologies, the application also utilizes:

- React Query: For efficient data fetching, caching, and synchronization.
- React Router: For managing navigation and routing within the application.
- Zod: A TypeScript-first schema declaration and validation library to ensure data integrity.

## Project Structure

The directory structure for the project is still being finalized. Once it is fully defined, this section will provide a comprehensive overview of how the project's files and components are organized, including details on the various directories.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/daniel-pompa/project-management-system.git
```

2. **Navigate to the project directory:**

```bash
cd project-management-system
```

3. **Install dependencies:**

```bash
npm install
```

4. **Run the development server:**

```bash
npm run dev
```

> [!NOTE]
> The server will typically run on <http://localhost:5173>, but check the output on your terminal to be sure.

Now, you're all set to explore the system!

## Usage

Once the project is up and running, the application offers the following functionality:

1. **User Registration**:
   - Users can sign up, confirm their accounts via email, and log in to access the system.

2. **Role-Based Access**:
   - **Project Manager**: Can create projects, add or remove team members, assign and manage tasks, and view task histories.
   - **Team Developer**: Can complete tasks, update task statuses, add notes, and view project details.

3. **Task Management**:
   - Projects are divided into tasks, each with a status (pending, on hold, in progress, review, or completed) and a change history for tracking purposes.

4. **Note System**:
   - Team developers can add notes to tasks to provide updates. Notes can only be deleted by the user who created them.

5. **Collaboration Features**:
   - Project managers control team membership, while developers collaborate on task completion without the ability to modify projects or tasks directly.

## Contributing

We welcome contributions from the community! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

Before submitting a pull request, please ensure your code follows the project's coding standards and includes tests where appropriate.

## License

This project is licensed under the MIT License.

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

> [!NOTE]
> Clicking on the MIT License badge to see the LICENSE file for details.

## Author

This project is maintained and developed by **Daniel Pompa Pareja**.

For any questions or suggestions, feel free to reach out via [email](mailto:daniel.40.pompa@gmail.com).

[Back to Top](#table-of-contents)
