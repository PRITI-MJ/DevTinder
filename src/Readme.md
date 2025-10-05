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



