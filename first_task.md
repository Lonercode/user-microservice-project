# User Microservice

Write a small microservice to manage the Users of an application. The service should be implemented with the REST standard.  
Everything not specified is up to you.  
Feel free to write an app (e.g. React app) to try those endpoints out or just include the HTTP requests.

## Features

- Add a new User
- Modify an existing User
- Remove a User
- Return a paginated list of Users, allowing for filtering by certain criteria (e.g. all Users with the country "UK")

## User Schema

```json
{
    "id": "c34a9851-3550-44a3-aa23-d6305758d247",
    "first_name": "Alice",
    "last_name": "Bob",
    "password": "supersecurepassword",
    "email": "alice@bob.com",
    "country": "UK",
    "created_at": "2024-06-25T10:25:53.853634275+02:00",
    "updated_at": "2024-06-25T10:25:53.853634275+02:00"
}
```