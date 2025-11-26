Version :-  5.1.0 => MAJOR.MINOR.PATCH

MAJOR version (X.y.z): Incremented for incompatible API changes (breaking changes).

MINOR version (x.Y.z): Incremented for adding new functionality in a backward-compatible manner.

PATCH version (x.y.Z): Incremented for backward-compatible bug fixes.

In versions, we have ~, ^, and exact versions.
-> ~ means, there is updates in patch version, but it locks the major and minor version.
-> ^ means, there is updates in patch and minor versions, but it locks the major version.
-> exact version means, it is locking all the version/

how to install nodemon?
-> npm install -g nodemon


what is -g in installing nodemon?
-> it means it is installing globally, making it available for use in any project without needing to reinstall it for each one. This allows us to run the nodemon command directly from your terminal in any directory to automatically restart your Node.js applications when code changes are detected. 

What is dependencies in package.json?
-> It says that on which things our project is dependent like here our project is currently dependent on express js.


Order  of the routes are important.
-> Child routes should be always be on upper order
-> Parent routes should always be on lower order

HTTP methods which is supported by browsers :- POST, GET,PATCH,DELETE




mongodb+srv://namastedev:Brnvm4ZQzuMDGfhw@namastenode.osae2ha.mongodb.net/


--v in document of mongodb defines the version.
good practice => Do not assign id to a user, it will automatically get created by monogodb itself.


Difference between PATCH and PUT?
-> PUT replaces an entire resource, while PATCH applies a partial update to a resource.



Anything which is not defined in the schema it will be ignored by the database.


Never use req.body, because any attackers can send malicious data, which will get stored in the database.

We use "Validator" to validate emailId, password, etc.

We use "bcrypt" to encrypt the password.

Whenever we make an API call, there is a token JWT(sends by the server and user stored it) which is every time validated by the server sent by the user for each API call, that this token belongs to that same user or not. 
But this is a hectic job, so to tackle all of these, web come up with a solution "COOKIES".

Process:- whenever a user sends request to login to the server, it will validate the password and email and generate a cookies which contains the JWT token inside it. This JWT token is very unique and is only made for the particular user. server sends response back to the user and browser saves this cookie for that user, and whenever user sends another request to the server, this cookie will be send along with the particular request,  that cookie will be validated again and then the server sends response back to the user.

We can even set the time for that cookie, till when that jwt token will work, once that time got finished, the server will not able to validate the old cookie, and it will sends response to login again.



Pagination:- 
- /feed?page=1&limit=10 => first 10 users 1-10 
=> .skip(0) & .limit(10)

- /feed?page=2&limit=10 => 11-20 
=> .skip(10) & .limit(10)

- /feed?page=3&limit=10 => 21-30 
=> .skip(20) & .limit(10)

skip formula = (page-1)*limit;