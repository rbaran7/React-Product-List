# React Product List

This project is a simple, no API, configuration file driven product list. This project features a client side OR filter capable of filtering out items from the product list.

React and Material UI (https://mui.com/) were used in the creation of this project.

# Configuration File

The file which drives the product list is found in this directory `public/product-config.json`. Since this project is a demonstration of React and its functions, placing the configuration file in the public directory is assumed to be okay. In doing this, a user can add / remove any value from this configuration file assuming they are following configuration contract (see below). When a user adds / removes values from the configuration file, the application does not need to be manually shutdown and restarted to see the changes.

# Configuration File Contract

The project configuration file supports the following contractual format. If you add values that do not comply with this format the application may error or you might not be able to see your changes apply.

`products: [{}]` - an array of product objects

{
    `id` - integer
    `image` - can be a path to an image stored in the project's directories or a valid image URL
    `name` - string
    `description` - string
    `metadata_tags` - array of strings ["", "", ...]
    `learn_more` - string (should be a valid URL)
    `go` -  string (should be a valid URL)
}

## Running the Application

In order to run the application please follow these steps:

1. In a directory on your machine clone this repository - `git clone https://github.com/rbaran7/React-Product-List.git`
2. Navigate into the projects root directory - `cd React-Product-List/`
3. Run the command - `npm install`
4. Run the command - `npm run start`
5. Open your browser and navigate to - `http://localhost:3000/`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. This is how you can view the application on your local machine.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
