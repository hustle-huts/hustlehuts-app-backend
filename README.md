# HustleHuts App Backend

Setup:

```
yarn
```

Run in debug:

```
yarn dev
```

Endpoints:

```
Localhost: http://localhost:3000
Production: https://hustlehuts-app-backend.onrender.com
```

Swagger Documentations:

```
Localhost: http://localhost:3000/api/swagger
Production: https://hustlehuts-app-backend.onrender.com/api/swagger
```

Commits pushed to main will auto deploy to the endpoint above

## How to call protected routes? (Routes which require bearer token)

Upon logging in, the API will return a JWT token (with 1 year expiry).

If you are testing out using Swagger, copy the token and enter it on the top right of the Swagger UI (the " Authorize " button).

If you are using it for frontend purposes,
Save the token into either localStorage or sessionStorage on the frontend.

You will need to set your API call header with the token. The following example is based on Axios:

```
    config.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
    config.headers.common["token-type"] = "bearer";
```
