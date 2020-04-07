# cloudinary-metadata-api
A simple API for interacting with Cloudinary metadata. 
Data is cached for 60 minutes, and is automatically refreshed when evicted.
Ensure you have a named transformation called `t_gallery-thumbnail` for thumbnail images.

## Create Cloudinary account:
* Create a Cloudinary account [here](https://cloudinary.com/console)
* Be sure to take note of the following values
    * Cloudinary Cloud name: The cloud name for the project you created
    * Cloudinary API key: The API key for the project you created
    * Cloudinary API secret: The API secret for the project you created
    
## API Documentation

## constructor

Creates an instance of the class.

```javascript
import CloudinaryCacheAPI from 'cloudinary-metadata-api';

const cloudinaryCloudName = '***';
const cloudinaryApiKey = '***';
const cloudinaryApiSecret = '***';
const cacheTimeToLiveSeconds = 60 * 60 ;    // optional, defaults to 1 hour
const cloudinaryCacheApi = new CloudinaryCacheAPI(cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret, cacheTimeToLiveSeconds);
```

## getAllPhotoData()

Gets all photo data from Cloudinary.
We fetch all tags, and then all photos for each tag.
Data is returned in a tag -> photo data map.
Data is cached for 60 minutes, and then automatically refreshed.

```javascript
const photoData = cloudinaryCacheApi.getAllPhotoData();
console.log(photoData);
```

Example output:

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

## clearCache()
Clears all cloudinary cache manually, instead of having to wait for the eviction time.

```javascript
cloudinaryCacheApi.clearCache();
```