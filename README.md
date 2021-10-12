# grant-disbursement

## Requirements

- NodeJS v14.16.0+
- NPM v7.7.4+
- MongoDB

## Setup

1. Install [NodeJS v14.16.0](https://nodejs.org/ko/blog/release/v14.16.0/)
2. Run `npm install -g npm@7.7.4` in terminal to upgrade to npm v7.7.4
3. Install [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)
4. Create .env file in root folder, and specify `APP_PORT` and `GRANTS_MONGO_URI`, example below:

   ```
   APP_PORT=3000
   GRANTS_MONGO_URI=GRANTS_MONGO_URI=mongodb://localhost:27017/grants_dev
   ```

5. Run `npm run seed` to add some data into local MongoDB

## Assumptions & Interpretations

1. Adding a household successfully will return the newly added household with its current family members
1. Adding a family member to a non-existing household should return status 500 with error message
1. Adding a family member successfully will return the added family member as response
1. Responses to listing or searching households will return matching households with its current family members
1. If hasCouple only accepts value true, otherwise it ignores the query parameter

## Troubleshooting

### Solution for Error: Your Command Line Tools are too outdated. (OSX)

1. Run the below commands

```sh
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --install
```

2. Re-run `brew install mongodb-community`

## Future Steps

1. Improve response format
1. Implement bonus endpoints
1. To Dockerize app & database
1. Improve error handling
