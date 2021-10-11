# grant-disbursement

## Requirements

- NodeJS v14.16.0+
- NPM v7.7.4+
- MongoDB

## Setup

1. Install [NodeJS v14.16.0](https://nodejs.org/ko/blog/release/v14.16.0/)
2. Run `npm install -g npm@7.7.4` in terminal to upgrade to npm v7.7.4
3. Install [MongoDB 5.0 Community Edition](https://docs.mongodb.com/manual/administration/install-community/)

## Assumptions

1. Search responses return households + all family members in each household

## Troubleshooting

### Error: Your Command Line Tools are too outdated. (OSX)

```sh
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --install
```

## Future/Next Steps

1. To create seed for database
1. To Dockerize database
