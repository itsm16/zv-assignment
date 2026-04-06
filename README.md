### Modules
- Auth
  - Login - `/api/auth/login`
  - Register - `/api/auth/register`
  - Logout - `/api/auth/logout`

- User
     - Get all users - `/api/user/get-users`
     - Update user - `/api/user/update/:id`
     - Delete user - `/api/user/delete/:id`

- Admin
  - Get all users - `/api/admin/get-users`
  - Update user - `/api/admin/update/:id`
  - Delete user - `/api/admin/delete/:id`

- Middleware
  - Check Token - `/api/middleware/check-token`
  - Check Role - `/api/middleware/check-role

- Records
  - Get all records - `/api/records/get-records`
  - Update record - `/api/records/update/:id`
  - Delete record - `/api/records/delete/:id`

- Overview
    - JWT Authentication
    - Role-based Access Control
    - Middleware for authentication and authorization
    - DTOs/ Zod schemas for request/response validation
    - PostgreSQL database with Prisma
    - seed script for initial data / admin user
    - Clean code / modular structure - divided in common and modules
    
    module structure:
    - route, controller, service, dto