### Creating Recipe Bundle

When the user clicks on the create button:

1. post request made to express, the recipe model is saved as json on file system.
2. The bundle build is called to create bundle.
3. The bundle build reads the json file data and inserts it into placeholders in bundle i.e. __RECIPE__.
4. The bundle is created and is accessible for download.

> TODO
> Need to create call to build bundle
> Need to create create.recipe.js file

> NOTE
> Current bundle is working as expected, has been tested in browser


