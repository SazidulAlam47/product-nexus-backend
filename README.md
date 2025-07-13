# Product Nexus Backend

A comprehensive backend system for product lifecycle management built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Live Demo

The API is currently deployed in digitalOcean and accessible at:

- **HTTP**: http://167.71.210.71:8000
- **HTTPS**: https://enemies-porter-sense-tumor.trycloudflare.com

You can test the endpoints using the provided Postman collection file (`postman_collection/Product Nexus.postman_collection.json`) or any HTTP client.

📹 **Video Demonstration**: Watch how the APIs work in action: [https://youtu.be/X-fzejfiA48](https://youtu.be/X-fzejfiA48)

📚 **API Documentation**: View the complete API documentation: [https://documenter.getpostman.com/view/34420148/2sB34foMGB](https://documenter.getpostman.com/view/34420148/2sB34foMGB)

## 📊 Data Model Diagram

![Product Nexus Data Model](data_model_diagram/Product%20Nexus%20-%20Data%20Model%20Diagram.png)

## 🚀 Features

- **Product Management**: Create, read, update products with comprehensive details
- **Auto-Generated Product Codes**: Intelligent product code generation based on product names
- **Category Management**: Associate products with categories for better organization
- **Image Upload**: Cloudinary integration for product image storage
- **Advanced Filtering**: Search products by name and filter by category
- **Price Calculation**: Automatic final price calculation with discount application
- **RESTful API**: Clean and well-documented API endpoints
- **TypeScript**: Full TypeScript support for better development experience
- **Error Handling**: Comprehensive error handling and validation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Image Storage**: Cloudinary
- **Validation**: Zod
- **Development**: ESLint, Prettier, ts-node-dev

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account for image storage

## 🚀 Installation & Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/SazidulAlam47/product-nexus-backend.git
    cd product-nexus-backend
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

    ```env
    NODE_ENV=development
    PORT=8000
    DATABASE_URL=mongodb://localhost:27017/product-nexus
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_KEY=your_cloudinary_key
    CLOUDINARY_SECRET=your_cloudinary_secret
    ```

4. **Run the application**

    ```bash
    # Development mode
    npm run dev

    # Production build
    npm run build
    npm start
    ```

## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

#### 1. Create Category

**POST** `/api/categories`

Create a new category.

**Request Body:**

```json
{
    "name": "Electronics"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Category created successfully",
    "data": {
        "_id": "6871f44db91eef951f5365b0",
        "name": "Electronics",
        "createdAt": "2025-07-12T05:36:13.829Z",
        "updatedAt": "2025-07-12T05:36:13.829Z",
        "__v": 0
    }
}
```

#### 2. Get All Categories

**GET** `/api/categories`

Retrieve all available categories.

**Response:**

```json
{
    "success": true,
    "message": "All Categories fetched successfully",
    "data": [
        {
            "_id": "6871f44db91eef951f5365b0",
            "name": "Electronics",
            "createdAt": "2025-07-12T05:36:13.829Z",
            "updatedAt": "2025-07-12T05:36:13.829Z",
            "__v": 0
        },
        {
            "_id": "6871f48ab91eef951f5365b8",
            "name": "Toys",
            "createdAt": "2025-07-12T05:37:14.794Z",
            "updatedAt": "2025-07-12T05:37:14.794Z",
            "__v": 0
        }
    ]
}
```

#### 3. Get Category by ID

**GET** `/api/categories/{categoryId}`

Retrieve detailed information about a specific category.

**Path Parameters:**

- `categoryId`: The unique identifier of the category

**Example Request:**

```bash
GET /api/categories/6871f44db91eef951f5365b0
```

**Response:**

```json
{
    "success": true,
    "message": "Category fetched successfully",
    "data": {
        "_id": "6871f44db91eef951f5365b0",
        "name": "Electronics",
        "createdAt": "2025-07-12T05:36:13.829Z",
        "updatedAt": "2025-07-12T05:36:13.829Z",
        "__v": 0
    }
}
```

#### 4. Create Product

**POST** `/api/products`

Add Product

This endpoint allows you to add a new product to the inventory. It accepts a file upload and product data as part of the request.

**Request Parameters**

The request must be made using `form-data` and should include the following parameters:

- **file** (type: file): This parameter is used to upload an image or file associated with the product.
- **data** (type: text): This parameter should contain a JSON string with the product details.

**Expected JSON Structure for data Parameter**

The data parameter should include the following fields:

- **name** (string): The name of the product.
- **description** (string): A brief description of the product.
- **price** (number): The original price of the product.
- **discount** (number): The discount applied to the product (optional).
- **status** (string): The availability status of the product (optional).
- **category** (ObjectId): The category under which the product falls.

**Example Request Body (data):**

```json
{
    "name": "Alpha Sorter",
    "description": "An advanced device to organize small electronic parts.",
    "price": 129.99,
    "discount": 10,
    "status": "In Stock",
    "category": "6871f44db91eef951f5365b0"
}
```

#### 5. Get All Products

**GET** `/api/products`

Retrieve all products with optional filtering and search capabilities.

**Query Parameters:**

- `search` (optional): Search products by name
- `category` (optional): Filter products by category

**Example Request:**

```bash
GET /api/products
```

**Response:**

```json
{
    "success": true,
    "message": "All Products fetched successfully",
    "data": [
        {
            "_id": "68726376e68fe556b09494b9",
            "name": "Alpha Sorter",
            "description": "An advanced device to organize small electronic parts.",
            "price": 129.99,
            "discount": 10,
            "image": "https://res.cloudinary.com/dvrqc1qdm/image/upload/v1752327030/Alpha%20Sorter-1752327022557.jpg",
            "status": "In Stock",
            "productCode": "wgxcbjcq-0alport8",
            "category": {
                "_id": "6871f44db91eef951f5365b0",
                "name": "Electronics",
                "createdAt": "2025-07-12T05:36:13.829Z",
                "updatedAt": "2025-07-12T05:36:13.829Z",
                "__v": 0
            },
            "createdAt": "2025-07-12T13:30:30.473Z",
            "updatedAt": "2025-07-12T13:30:30.473Z",
            "__v": 0,
            "finalPrice": 116.99
        }
    ]
}
```

#### 6. Get Product by ID

**GET** `/api/products/{productId}`

Retrieve detailed information about a specific product.

**Path Parameters:**

- `productId`: The unique identifier of the product

**Example Request:**

```bash
GET /api/products/68728f1e03357d28c0135fdd
```

**Response:**

```json
{
    "success": true,
    "message": "Product fetched successfully",
    "data": {
        "_id": "68728f1e03357d28c0135fdd",
        "name": "Kids Puzzle Set",
        "description": "Colorful jigsaw puzzles to improve kids' cognitive skills.",
        "price": 180,
        "discount": 6,
        "image": "https://res.cloudinary.com/dvrqc1qdm/image/upload/v1752338206/Kids%20Puzzle%20Set-1752338202340.jpg",
        "status": "Stock Out",
        "productCode": "g673ioqu-4puzz7",
        "category": {
            "_id": "6871f48ab91eef951f5365b8",
            "name": "Toys",
            "createdAt": "2025-07-12T05:37:14.794Z",
            "updatedAt": "2025-07-12T05:37:14.794Z",
            "__v": 0
        },
        "createdAt": "2025-07-12T16:36:46.824Z",
        "updatedAt": "2025-07-12T23:38:43.013Z",
        "__v": 0,
        "finalPrice": 169.2
    }
}
```

#### 7. Update Product

**PATCH** `/api/products/{productId}`

Update specific product details.

**Path Parameters:**

- `productId`: The unique identifier of the product

**Request Body:**

```json
{
    "description": "Updated description",
    "discount": 15,
    "status": "Stock Out"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Product updated successfully",
    "data": {
        "_id": "68728f1e03357d28c0135fdd",
        "name": "Kids Puzzle Set",
        "description": "Updated description",
        "price": 180,
        "discount": 15,
        "image": "https://res.cloudinary.com/dvrqc1qdm/image/upload/v1752338206/Kids%20Puzzle%20Set-1752338202340.jpg",
        "status": "Stock Out",
        "productCode": "g673ioqu-4puzz7",
        "category": "6871f48ab91eef951f5365b8",
        "createdAt": "2025-07-12T16:36:46.824Z",
        "updatedAt": "2025-07-13T01:30:28.314Z",
        "__v": 0,
        "finalPrice": 153.0
    }
}
```

## 🔧 Product Code Generation Algorithm

The system automatically generates unique product codes using the following algorithm:

1. **Extract Longest Increasing Substring**: Find the longest consecutive letters in alphabetical order (lowercase)
2. **Concatenate Multiple Substrings**: If multiple substrings of equal length exist, concatenate them
3. **Add Indices**: Append starting and ending indices of the substring in the product name
4. **Hash Prefix**: Add a hashed value of the product name as a prefix with a dash
5. **Final Format**: `<hashed_product_name>-<start_index><substring><end_index>`

**Example:**

- Product Name: "Alpha Sorter"
- Longest increasing substrings: "alp" and "ort"
- Starting and ending indices: 0 and 8
- Generated code: "wgxcbjcq-0alport8"

## 📁 Project Structure

```
product-nexus/
├── src/
│   ├── app/
│   │   ├── config/           # Configuration files
│   │   ├── constant/         # Constants for the project
│   │   ├── errors/           # Custom error classes
│   │   ├── interface/        # TypeScript interfaces
│   │   ├── middlewares/      # Express middlewares
│   │   ├── modules/          # Feature modules
│   │   │   ├── category/     # Category management
│   │   │   └── product/      # Product management
│   │   ├── routes/           # Route definitions
│   │   └── utils/            # Utility functions
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
├── data_model_diagram/      # Database schema diagrams
├── postman_collection/      # API testing collection
├── uploads/                 # File upload directory
└── README.md               # This file
```

## 🗄️ Data Model

The system uses MongoDB with the following main collections:

- **Products**: Store product information
- **Categories**: Store category information

See the data model diagram above for detailed schema information.

## 🧪 Testing

The project includes a Postman collection for API testing:

- **Collection**: `postman_collection/Product Nexus.postman_collection.json`
- **Environment**: Configure with your server URL

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint with auto-fix
npm run format      # Format code with Prettier
```
