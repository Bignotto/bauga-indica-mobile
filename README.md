# React Native app with Expo, React Navigation, Clerk authentication and Gluestack components

This project was created using:

```sh
npx create-expo-app
```

## React Navigation

Stack navigation is installed and configured.

- Routes are defined in `/src/routes/index.tsx`
- Type routes names in `Navigation.types.ts`

## Gluestack

Gluestack is installed and configured.

## Clerk authentication

Clerk authentication for Expo installed and configured.

- users can login with any Google account
- login and logout flow configured

## How to use this template

- Create a new repository based on this template
- Install dependencies:

```sh
npm install
```

- Create a project at Clerk.com and copy the API key
- Create `.env.local` file and paste your API key:

```text
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

- Run the app with:

```sh
npx expo start
```
