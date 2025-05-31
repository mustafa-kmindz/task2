# Product Catalog React App

This is a React.js conversion of the original vanilla JavaScript product catalog application.

## Features

- **Product Listing**: Display products from the DummyJSON API
- **Search Functionality**: Search products by name/title
- **Category Filtering**: Filter products by categories
- **Sorting**: Sort products by price (low to high, high to low) and rating
- **Image Gallery**: Interactive image gallery with thumbnail navigation
- **Responsive Design**: Mobile-friendly with dropdown controls
- **Rating Display**: Star rating system
- **Product Details**: Expandable product descriptions

## Components Structure

- **App.js**: Main application component with state management
- **SearchSection**: Search input and clear functionality
- **MobileControls**: Mobile-responsive category and sort dropdowns
- **CategoriesSidebar**: Desktop category filter sidebar
- **ProductsSection**: Product grid container with sort buttons
- **ProductCard**: Individual product display component
- **ImageGallery**: Product image carousel with thumbnail navigation
- **StarRating**: Star rating display component

## API Integration

The app uses the DummyJSON API:
- Products: `https://dummyjson.com/products`
- Categories: `https://dummyjson.com/products/categories`
- Search: `https://dummyjson.com/products/search`
- Category Products: `https://dummyjson.com/products/category/{category}`

## Installation and Setup

1. Navigate to the project directory:
   ```bash
   cd product-catalog-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Conversion from Vanilla JS

This React version maintains all the functionality of the original vanilla JavaScript application while providing:

- **Component-based architecture**: Better code organization and reusability
- **State management**: React hooks for cleaner state handling
- **Modern development**: Hot reloading and modern build tools
- **Type safety**: Better development experience with React
- **Maintainability**: Easier to extend and modify

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects from Create React App (one-way operation)

## Browser Support

The app supports all modern browsers and is responsive across different screen sizes.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
