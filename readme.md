## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized.

This is a basic application of Public Key Cryptography. By using Elliptic Curve Digital Signatures, the server only allows transfers that have been signed for by the person who owns the associated address.

## Warning ##

This project is a simple exercise that knowingly includes some security holes, such as:

- The client asks for your public key. 
- The server already has account public keys stored. 
- The transaction does not include a nonce. Thus, intercepting a transaction signature would allow for that specific transaction to be repeated until the wallet is drained.
etc.


The project includes two main folders:
 
## Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/


## Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the dependencies 
3. Run `npx node index` to start the server 
4. The application should connect to the default server port (3042) automatically! 

The server also includes a `scripts` subfolder. It includes a `generate.js` file, that can be run to create new Private key - Public Key/Address pairs. These pairs (as well as the amount of currency they include) must be manually added on the both the `balances` and `privateKeys` objects, inside `index.js`. 

## author
👤 **Rabecca Nabwire**

- GitHub: [@gitHubhandle](https://github.com/becky449)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/rabeccanabwire/)

<p align="right"><a href="#readme-top">back to top</a></p>