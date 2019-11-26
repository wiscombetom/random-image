# random-image
Pull random image/description pair from list of json objects.

### Usage Instructions
1. Clear the "images" directory and add the images you want to pick from.

    **Image Sizing Restrictions:** No explicit image size restriction. The images are filling the maximum space they can, keeping the aspect ratio intact and preventing the image from overlapping or pushing the text out of the container.

2. Remove the old image data from `data.js` and enter the new corresponding data into the variable `data`, an array of objects. Each object describes an image, and contains these fields:

    **`id`** (number) - A unique identification number for the image/title/description. 
        
    > **Restriction:** `id` must be a number between `0` and `data.length - 1`
   
    **`path`** (string) - The name of the image file inside of the images directory, including the file type (e.g example.png)
    
    **`title`** (string) - The title of the image to be displayed to the end user.
    
    **`description`** (string) - The description of the image to be displayed to the end user.
    
    **`tags`** (array of strings)- Each string in the array is a separate tag. Any images that share a tag cannot be chosen together unless explicitly overridden by URL parameters.

3. Launch the web page by running `index.html` in a web browser. Optionally, add parameters to the url; the parameters are as follows, where `<IMAGE_ID>` is representing the `id` from the json for the desired image:

      **`?panel1=<IMAGE_ID>`**
    This would overwrite panel1 to display a certain image.
    
      **`?panel2=<IMAGE_ID>`**
    This would overwrite panel2 to display a certain image.
    
      **`?panel1=<IMAGE_ID>&panel2=<IMAGE_ID>`**
    This would overwrite both panel1 and panel2 to display certain images.

4. Click the **`>`** button on the web page to retrieve the next image/title/descriptions.
