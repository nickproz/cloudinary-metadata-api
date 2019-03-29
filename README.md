# cloudinary-express-routes
A simple API for interacting with a Cloudinary photos. 
Data is cached for 60 minutes, and is automatically refreshed when evicted.
Ensure you have a named transformation called `t_gallery-thumbnail` for thumbnail images.

Import these routes into an existing node express server to
expose them. Below is an example:

```javascript 1.8
// Initialize our Express app
let app = express();

// Initialize our routes on the app
require('cloudinary-express-routes')(app);
```

## Create Cloudinary account:
* Create a Cloudinary account [here](https://cloudinary.com/console)
* Add the correct credentials to the `.env` file in the root of the project (or, if deploying to Heroku, add these to the `Config Vars` for the application)
    * **CLOUDINARY_CLOUD_NAME**: The cloud name for the project you created
    * **CLOUDINARY_API_KEY**: The API key for the project you created
    * **CLOUDINARY_API_SECRET**: The API secret for the project you created
    
## API Documentation

## Get All Photo Data

Gets all photo data from Cloudinary.
We fetch all tags, and then all photos for each tag.
Data is returned in a tag -> photo data map.
Data is cached for 60 minutes, and then automatically refreshed.

### Usage

**URL** : `/cloudinary/photos`

**Method** : `GET`

### Success Response
 
**Condition** : Cloudinary credentials are correct on the server.

**Code** : `200 OK`

**Content example** :
```json
{
    "banff": [
        {
            "thumbnailUrl": "http://res.cloudinary.com/:cloudName/image/upload/t_gallery-thumbnail,f_auto/banff/banff-0",
            "photoUrl": "http://res.cloudinary.com/:cloudName/image/upload/f_auto/banff/banff-0"
        },
        {
            "thumbnailUrl": "http://res.cloudinary.com/:cloudName/image/upload/t_gallery-thumbnail,f_auto/banff/banff-1",
            "photoUrl": "http://res.cloudinary.com/:cloudName/image/upload/f_auto/banff/banff-1"
        }
    ],
    "zion": [
      {
          "thumbnailUrl": "http://res.cloudinary.com/:cloudName/image/upload/t_gallery-thumbnail,f_auto/banff/zion-0",
          "photoUrl": "http://res.cloudinary.com/:cloudName/image/upload/f_auto/banff/zion-0"
      }
    ]
}
```

### Error Response

**Condition** : An error occurred on the server.

**Code** : `500 INTERNAL SERVER ERROR`

**Content example** :

```json
{
    "status": 500,
    "message": "eAn internal server error occurred.",
    "type": "Internal Server Error"
}
```
