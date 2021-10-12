# grant-disbursement

## Requirements

- NodeJS v14.16.0+
- NPM v7.7.4+
- MongoDB

## Setup

1. Install [NodeJS v14.16.0](https://nodejs.org/ko/blog/release/v14.16.0/)
2. Run `npm install -g npm@7.7.4` in terminal to upgrade to npm v7.7.4
3. Install [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)

## Assumptions/Interpretations

1. Adding a household successfully will return the newly added household with its current family members
1. Adding a family member to a non-existing household should return status 500 with error message
1. Adding a family member successfully will return the added family member as response
1. Responses to listing or searching households will return matching households with its current family members

## Troubleshooting

### Solution for Error: Your Command Line Tools are too outdated. (OSX)

1. Run the below commands

```sh
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --install
```

2. Re-run `brew install mongodb-community`

## Future/Next Steps

1. To Dockerize database
