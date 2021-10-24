# Back-end

### Base URL - tbd

## Endpoints

### AUTH endpoints

#### POST /api/auth/register

Authenticats user's credentials, returns JSON object with token

##### Request

```
  axios.post('https://baseURL/api/auth/register', {
      name:"Ed",
      email:"ed@test.com",
      password:"12345"
  })
```

##### Response

```
{
    user: {
        id:1,
        name: "Ed",
        role: "Instructor",
        email: "ed@test.com"
    }
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Im1lcnJ5IiwiaWF0IjoxNjAyODI0NzY1LCJleHAiOjE2MDI5MTExNjV9.72QcurdjfdhdjhdjhF08bEB05NE_sdkjsfdjh-Hddkfh"

}

```

#### POST /api/auth/login

Authenticats user's credentials, returns JSON object with token

##### Request

```
  axios.post('https://baseURL/api/auth/login', {
      email:"ted@test.com",
      password:"12345"
  })
```

##### Response

```
{
    user: {
        id:2,
        name: "Ted",
        role: "Client",
        email: "ted@test.com"
    }
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Im1lcnJ5IiwiaWF0IjoxNjAyODI0NzY1LCJleHAiOjE2MDI5MTExNjV9.72QcurdjfdhdjhdjhF08bEB05NE_sdkjsfdjh-Hddkfh"

}

```

### USER endpoints

#### GET /api/users/:user_id

Returns user information for authenthicated requests

##### Request

```
  axios.get('https://baseURL/api/users/2')
```

##### Response

```

 {
    id:2,
    name: "Ted",
    role: "Client",
    email: "ted@test.com"
 }

```

#### GET /api/users/:user_id/classes

Returns an array of all classes belonging to specific user_id, if the user is authenticated

##### Request

```
axios.get('https://baseURL/api/users/1/classes')
```

##### Response

```
[
    {
        class_id: 1,
        name: "Yoga",
        start_time: 17:00,
        date: Nov-22-2021,
        duration_mins: 60,
        intensity: "Low",
        location: "Los Angelos",
        max_size: 10,
        user_id: 1
    },
      {
        class_id: 6,
        name: "Tennis",
        start_time: 11:00,
        date: Oct-27-2021,
        duration_mins: 45,
        intensity: "Advanced",
        location: "Los Angelos",
        max_size: 6,
        user_id: 1
    }
]
```

#### PUT /api/users/:user_id/

Returns a an object with updated user fields, if the user is authenticated

##### Request

```
axios.put('https://baseURL/api/users/1', {
    email: "ed@test.com",
    password: "Changed to 123456789"*,
    name: "Changed to Edward"
})
```

##### Response

```
{
    id:1,
    name: "Edward",
    role: "Client",
    email: "ted@test.com"
 }
```

#### DEL /api/users/:user_id

Return a success message about deletion of the user's account

##### Request

```
axios.delete('https://baseURL/api/users/1')
```

##### Response

```
{
    message: "User id 1 is deleted"
}
```

#### POST /api/users/:user_id/:class_id

Used when a "client" role signs up for a new class. Returns an object with class information

##### Request

```
axios.post('https://baseURL/api/users/1/4', {
    user_id: 1,
    class_id: 4
})
```

##### Response

```
{
    class_id: 6,
    name: "Tennis",
    start_time: 11:00,
    date: Oct-27-2021,
    duration_mins: 45,
    intensity: "Advanced",
    location: "Los Angelos",
    max_size: 6,
    user_id: 2
}
```

#### DEL /api/users/:user_id/:class_id

Used when a "client" role user, wants to drop from the class they have previously registered
Returns a success message about deletion of the user's class subscription 

##### Request

```
axios.delete('https://baseURL/api/users/1/6')
```

##### Response

```
{
    message: "User id 1 unsubscribed from class id 6"
}
```

### CLASS endpoints

#### GET /api/classes

Returns array of all classes if a client searches for classes

##### Request 

```
axios.get('https://baseURL/api/classes/')
```

##### Response
```
[
    {
        class_id: 1,
        name: "Yoga",
        start_time: 17:00,
        date: Nov-22-2021,
        duration_mins: 60,
        intensity: "Low",
        location: "Los Angelos",
        max_size: 10,
        user_id: 1
    },
      {
        class_id: 6,
        name: "Tennis",
        start_time: 11:00,
        date: Oct-27-2021,
        duration_mins: 45,
        intensity: "Advanced",
        location: "Los Angelos",
        max_size: 6,
        user_id: 2
    }
]
```

#### GET /api/classes/:class_id

Return a specific classes information as an object

##### Request 
```
axios.get('https://baseURL/api/classes/6')
```

##### Response
```
{
    class_id: 6,
    name: "Tennis",
    start_time: 11:00,
    date: Oct-27-2021,
    duration_mins: 45,
    intensity: "Advanced",
    location: "Los Angelos",
    max_size: 6,
    user_id: 2
}
```
#### POST /api/classes/

Return a new created class information as an object. Note that only instructors can create a class, not cllients

##### Request 
```
axios.post('https://baseURL/api/classes/', {
    name: "Tennis",
    start_time: 11:00,
    date: Oct-27-2021,
    duration_mins: 45,
    intensity: "Advanced",
    location: "Los Angelos",
    max_size: 6,
    user_id: 1,
})
```

##### Response
```
{
    class_id: 10,
    name: "Tennis",
    start_time: 11:00,
    date: Oct-27-2021,
    duration_mins: 45,
    intensity: "Advanced",
    location: "Los Angelos",
    max_size: 6,
    user_id: 1
}
```

#### PUT /api/classes/:1

Return updated class information as an object. Note that only instructors can update a class, not cllients

##### Request 
```
axios.post('https://baseURL/api/classes/:10', {
    name: "Changed to new name",
    start_time: 11:00,
    date: Oct-27-2021,
    duration_mins: 45,
    intensity: "Changed to Beginner",
    location: "Los Angelos",
    max_size: 6,
    user_id: 1,
})
```

##### Response
```
{
    class_id: 10,
    name: "Changed name here",
    start_time: 11:00,
    date: Oct-27-2021,
    duration_mins: 45,
    intensity: "Changed intensity here",
    location: "Los Angelos",
    max_size: 6,
    user_id: 1
}
```


#### DEL /api/classes/:id

Returns a success message for deletion. Note that only instructors can delete the class, not clients 
(clients can only unsubscribe from registered classes, which is described in user routes)

##### Request
```
axios.delete('https://baseURL/api/classes/:10')
```
##### Response

```
{
    message: "Successfully deleted class id 10"
}
```



