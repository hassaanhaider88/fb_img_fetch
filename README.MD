# HMK Hassaan's Facebook Image Fetcher API

This project provides an API that fetches all the images from a given Facebook post URL. It uses Puppeteer, a Node.js library, to scrape the page, handle lazy-loaded images, and return all the valid image URLs from the post.

## Features
- Fetches all images from a given Facebook post.
- Handles lazy-loaded images by scrolling through the page.
- Filters out images that are not valid (e.g., data URIs, .png images).

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hassaanhaider88/fb_img_fetch
   cd your-repository-directory
   ```

2. **Install dependencies**:
   Ensure that you have Node.js installed. Then, run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Install Puppeteer**:
   You can optionally install Puppeteer with a different Chrome executable if needed.

4. **Setup your environment**:
   If you're deploying this on a server, ensure you have Google Chrome installed and specify the executable path in the `puppeteer.launch` method. You can change the executable path to the location of Chrome in your system (in your script, it's set for Windows).

## Running the API

Start the server by running:
```bash
node index.js
```

This will launch the API on `http://localhost:3000`.

## API Usage

### Fetch Images from a Facebook Post

To fetch images from a Facebook post, make a GET request to `/fetch-images` with a `url` query parameter containing the URL of the Facebook post.

**Endpoint**: `GET /fetch-images?post_url=<facebook-post-url>`

### Example

- Request:
  ```bash
  GET http://localhost:3000/fetch-images?url=https://web.facebook.com/share/p/15jQMrTzTT
  ```

- Response:
  ```json
  {
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ]
  }
  ```

### Response

- `images`: An array of URLs of the images found in the Facebook post. The images will not be `.png` files or data URIs.

### Error Handling

If there is an error fetching the images, the API will return a `500` status with an error message:

- **Error Response**:
  ```json
  {
    "error": "Failed to fetch images"
  }
  ```

## Notes

- The API uses Puppeteer to open the Facebook post in a headless browser.
- It automatically scrolls the page to ensure all lazy-loaded images are loaded.
- The images are filtered to exclude `.png` images and data URIs.

## Development

If you'd like to contribute to the development or improve the project, feel free to fork the repository and make a pull request.

---

This `README.md` provides a guide on how to use the API and what the expected output is. You can add any further setup instructions if needed based on your deployment environment.