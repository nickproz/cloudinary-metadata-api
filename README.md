# cloudinary-metadata-api
A simple API for interacting with Cloudinary metadata. 
Ensure you have a named transformation called `t_gallery-thumbnail` for thumbnail images.

## Create Cloudinary account:
* Create a Cloudinary account [here](https://cloudinary.com/console)
* Be sure to take note of the following values
    * Cloudinary Cloud name: The cloud name for the project you created
    * Cloudinary API key: The API key for the project you created
    * Cloudinary API secret: The API secret for the project you created
    
## API Documentation

### constructor

Creates an instance of the class.

```typescript
import CloudinaryMetadataApi from 'cloudinary-metadata-api'; 
import { CloudinaryCredentials } from './src/model/cloudinary-credentials.interface';

const credentials: CloudinaryCredentials = {
    cloudinaryApiKey: '***',
    cloudinaryApiSecret: '***',
    cloudinaryCloudName: '***'
}

const api = new CloudinaryMetadataApi(credentials);
```

### getAllPhotoData()

Gets all photo data from Cloudinary.
We fetch all tags, and then all photos for each tag.
Data is returned in a tag -> photo data map.

```typescript
import { PhotoMap } from './src/model/cloudinary-photo.interface';

const photoData: PhotoMap = api.getAllPhotoData();
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