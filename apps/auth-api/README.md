# Auth API

This is a boilerplate for an authentication API using Node.js, Express, and MongoDB.

## Index
- [Getting Started](#getting-started)
- [Routes](#routes)
    - [User](#user)
    - [Auth](#auth)
- [Technologies](#technologies)

## Getting Started
First of all you need to install the dependencies by running the following command:

> Remember to rename the package.json name field to your project name

```bash
yarn install
```

After that, you need to create a `.env` file in the root of the project and add the following environment variables:

```env
PORT=3000
MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret
EMAIL_USERNAME=email_for_sending_emails
EMAIL_PASSWORD=app_password_for_email
```

Then you can start the server by running:

```bash
yarn dev
```

## Routes
The routes of this API are divided into two categories: `auth` and `user`.

If any of the routes returns an error, the response will be:
```typescript
interface ErrorResponse {
    ok: false;
    msg: string;
    errors?: string[];
}
```

### User
The user routes contains all the CRUD operations for the user model. The routes are:

**All the routes are protected and require a valid JWT token**

These are the routes:

**Get User**
- `GET /api/user`: returns the current user based on the JWT token

Returns:
```typescript
interface GetUserResponse {
    ok: true;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            status: boolean;
        }
    }
}
```

**Create User**
- `POST /api/user`: Create a new user

The body of the request should be:
```typescript
interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}
```

Returns:
```typescript
interface CreateUserResponse {
    ok: true;
    data: {
        token: string;
    }
}
```

**Update User**
- `PUT /api/user`: Update the current user

The body of the request should be:
```typescript
interface UpdateUserRequest {
    name?: string | undefined;
    email: string;
    password: string;
    newPassword?: string | undefined;
}
```

Returns:
```typescript
interface UpdateUserResponse {
    ok: true;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            status: boolean;
        }
    }
}
```

**Delete User**
- `DELETE /api/user`: Delete the current user

Returns:
```typescript
interface DeleteUserResponse {
    ok: true;
    data: {
        msg: string;
    }
}
```

### Auth
The auth routes contains the routes related to the authentication of the user. The routes are:

**Login**
- `POST /api/auth/login`: Login the user

The body of the request should be:
```typescript
interface LoginRequest {
    email: string;
    password: string;
    remember?: boolean;
}
```

Returns:
```typescript
interface LoginResponse {
    ok: true;
    data: {
        token: string;
    }
}
```

**Renew**
- `GET /api/auth/renew`: Renew the JWT token (**Protected route**)

Returns:
```typescript
interface RenewResponse {
    ok: true;
    data: {
        token: string;
    }
}
```

**Forgot Password**
- `POST /api/auth/forgot-password`: Email the user with a token to reset the password

The body of the request should be:
```typescript
interface ForgotPasswordRequest {
    email: string;
}
```

Returns:
```typescript
interface ForgotPasswordResponse {
    ok: true;
    data: {
        msg: string;
    }
}
```

**Reset Password**
- `POST /api/auth/reset-password`: Reset the user password

The body of the request should be:
```typescript
interface ResetPasswordRequest {
    email: string;
    token: string;
    password: string;
}
```

Returns:
```typescript
interface ResetPasswordResponse {
    ok: true;
    data: {
        msg: string;
    }
}
```

## Technologies
- Node.js
- Express
- MongoDB
- JWT
- Nodemailer
- Bcrypt
- Dotenv
- Cors
- Handlebars
