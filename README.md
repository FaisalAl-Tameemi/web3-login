# Web3 Login

A basic app to showcase connecting to a web3 wallet and signing a message to gain access to a protected page.

_A hosted version of this repo is [available on Vercel](https://web3-login-sigma.vercel.app/)._

## Demo

Below is a gif (😅 yes it's grainy) showing a demo of the login flow:

![](./public/demo-labelled.gif)

## How It Works

The following steps describe the overall web3 login flow:

1. The web application requests a wallet connection to one or more accounts
2. The web application prepares a plain-text message and sends a signing request to the wallet
    * Note: The current web app implementation assumes its always the first connected account is the one doing the signing. This can be easily modified such that the user selects the account that they want to sign the message with from a dropdown. [Issue 3](https://github.com/FaisalAl-Tameemi/web3-login/issues/3).
3. Once the signature is obtained, it is sent along with the plain-text message and the account address to the API for verification. If the verification succeeds, a session cookie (JWT) is sent back from the API and stored in the browser locally.
4. The user is redirect to the protected page
    * The protection referred to here is at the UI / frontend level. This is done for UX purposes and doesn't actually protect any secure resources (that's on the API in Step 5 below).
5. A secret value is requested from the API (which verifies the session cookie) and responds back to the UI if the token is valid.


![](./public/flow.png)


## Local Development

To run this repository locally, clone the repo and follow the steps below:

1. Install dependencies with your favourite package manager
    * Tested with Node version `18.x.x` and `19.x.x`

```
yarn install
```

2. Install a browser wallet (such as [PolkadotJS](https://polkadot.js.org/extension/) or [Talisman](https://www.talisman.xyz/))
    * Other wallets should also work but haven't been tested.

3. Copy `.env.example` into `.env.local` and add your secrets
    * [RandomKeygen](https://randomkeygen.com/) can be used to generate random strings

```
cp .env.example .env.local
```

4. Run the NextJS application locally

```
yarn dev
```

5. Open `localhost:3000` on in a browser window

## Deployment

This sample application can be deployed on any platform which runs NodeJS.

Below is a one-click deploy button for hosting this application on [Vercel](https://vercel.com) which has built-in support for NextJS applications.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFaisalAl-Tameemi%2Fweb3-login&env=NEXT_AUTH_SECRET,JWT_SECRET)


## General Notes

1. This repo implements the signin logic twice. The first using `NextAuth` plugin and the second using a `jwt` library. This is done for experimentation purposes.
    * The `NextAuth` flow can be tested using the UI.
    * The `jwt` flow doesn't enforce session and CSRF. It can be tested via Postman.

2. This repo is not optimized for production

3. Some improvements can be made to make this example closer to being production ready. See the issues in this repo for an idea of what can be improved.
