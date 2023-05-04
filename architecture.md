# Architecture Document

## Members

- Xavier Caracter
- Andrew Doering
- Matthew Kelley

### Overview

The following project is a mock of a funds transfer application like Cashapp or Venmo. 

### Upstream

The upstream program is a Java gRPC service that persists transaction, user, and auth information in a Redis database. The redis database is configured to be persistent so it acts like any other persistent store rather than a cache. The protobuf definition which defines the service contract can be found in `upstream/app/src/main/proto`. The upstream service can be deployed anywhere with the provided docker image.

### Downstream

The downstream client is a TypeScript React Native application. The app utilizes expo for scaffolding and can be run on iOS, Android, or the web.

#### State Management

All non-presentational state is globally available across the application using the  `AppStateContext`. All the exported members of `AppStateContext` use React's built-in flux pattern hook, `useReducer`. Utilizing this pattern eliminated any prop drilling, whenever a child of the context needs any of the global state it simply calls the `useAppState` hook where it builds the context for callers to consume.

The TypeScript interfaces below define the shape of the global state. These are logically equivalent to UML diagrams.

```ts
export interface AuthState {
  token: string | null; // the users opaque auth token. This is implemented as a JWT in the gRPC server.
  user: User | null;    // the user object of the currently authenticated user.
}

export interface AppDataState {
  transactions: Transaction[]; // the set of all the users transactions
  users: User[];               // the set of all users of the application. obviously this would not scale well in a real application.
}

// Although this is not strictly non-presentational, this state is how we derive the transaction amount 
// inside the execute pay view.
export interface PayViewState {
  payAmount: {
    whole: number;
    fraction: number | null; // this null is a hack for displaying the decimal point in the UI
  };
}

export interface ProfileViewState {
  userId: string | null; // this points to a user object inside the AppDataState
}

// also not strictly non-presentational, this state is used to derive the transaction amount 
// and some UI features that are not strictly inside the execute pay view.
export const PayEvents = ["Pay", "Request", "AddFunds"] as const;
export const SelectablePayEvents = ["Pay", "Request"] as const;
export type PayEvent = typeof PayEvents[number];
export interface ExecutePayState {
  payEvent: PayEvent | null;
  payingUserId: string | null;
  receivingUserId: string | null;
}
```

#### Navigation

We have utilized the expos teams wrapper for `@react-navigation/native` router package. This package with some additional tooling from Expos bundler supports file based routing. All views that are logically associated with a tab are registered with our router using file based routing. 

Expo router supports partioning segments of your app into file directories, they provide a hook for you to do reflection on where a user is at in your application. We utilize this feature to implement protected routes. 

#### Theming

We have created a component library that matches our design language. This make it simpler to keep a consistent theme accross all components. Wrapping the native components also allows us to select which color scheme is displayed accross our application. As well, it allows us to make some compound components that simplify some common components accross the application.

The color scheme can be tuned by modifying the exported objects in `constants/Color`.
