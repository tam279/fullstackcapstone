# Frontend (client)

This is using the [React](https://react.dev/) library and written in typescipt.

- Run for development: `npm start`
- Build to optimize for deployment: `npm run build`
- Run deployment server: `npm run start`

Additional libraries used:

1. [axios](https://axios-http.com/docs/intro)
3. [react-bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
4. [react-google-charts](https://www.react-google-charts.com/)
5. [react-router-dom](https://reactrouter.com/en/main/start/overview)

Codes and components reside in the `client/src`

The entry point of the React application can be found in `client/src/index.tsx`

### Routing

The url routing for the application resides in the `client/src/App.tsx`

## src folders

### src

- index
- App (routes)
- config (backend url)

### components

- Footer
- Navigation
- Sidebar (SidebarProject)
- Authentication filter (PrivateRoute)

### modals

- ChangePasswordModal
- CreateNewCompanyModal
- CreateNewProjectModal
- CreateNewTaskModal
- CreateNewUserModal
- EditCompanyModal
- EditProjectModal
- EditUserModal
- LogoutModal
- ProfileModal
- TaskDetailModal
- NewPasswordModal

### pages

- AboutPage
- ContactPage
- LandingPage
- LoginPage
- ProjectDetailPage
- ProjectListPage
- ServicesPage
- UserManagementPage

### problemdomain

- DataService, fetches user and company data.
- Interface, contains interface for the models used.