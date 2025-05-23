/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AppImport } from './routes/_app'
import { Route as AppIndexImport } from './routes/_app/index'
import { Route as AuthRegisterImport } from './routes/_auth.register'
import { Route as AuthLoginImport } from './routes/_auth.login'
import { Route as AuthForgotPasswordImport } from './routes/_auth.forgot-password'
import { Route as AppVocabImport } from './routes/_app/vocab'
import { Route as AppSignoutImport } from './routes/_app/signout'
import { Route as AppSettingsImport } from './routes/_app/settings'
import { Route as AppDashboardImport } from './routes/_app/dashboard'
import { Route as AppChatIndexImport } from './routes/_app/chat.index'
import { Route as AppChatChatIdImport } from './routes/_app/chat.$chatId'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AuthForgotPasswordRoute = AuthForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => AuthRoute,
} as any)

const AppVocabRoute = AppVocabImport.update({
  id: '/vocab',
  path: '/vocab',
  getParentRoute: () => AppRoute,
} as any)

const AppSignoutRoute = AppSignoutImport.update({
  id: '/signout',
  path: '/signout',
  getParentRoute: () => AppRoute,
} as any)

const AppSettingsRoute = AppSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AppRoute,
} as any)

const AppDashboardRoute = AppDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AppRoute,
} as any)

const AppChatIndexRoute = AppChatIndexImport.update({
  id: '/chat/',
  path: '/chat/',
  getParentRoute: () => AppRoute,
} as any)

const AppChatChatIdRoute = AppChatChatIdImport.update({
  id: '/chat/$chatId',
  path: '/chat/$chatId',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_app/dashboard': {
      id: '/_app/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AppDashboardImport
      parentRoute: typeof AppImport
    }
    '/_app/settings': {
      id: '/_app/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AppSettingsImport
      parentRoute: typeof AppImport
    }
    '/_app/signout': {
      id: '/_app/signout'
      path: '/signout'
      fullPath: '/signout'
      preLoaderRoute: typeof AppSignoutImport
      parentRoute: typeof AppImport
    }
    '/_app/vocab': {
      id: '/_app/vocab'
      path: '/vocab'
      fullPath: '/vocab'
      preLoaderRoute: typeof AppVocabImport
      parentRoute: typeof AppImport
    }
    '/_auth/forgot-password': {
      id: '/_auth/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordImport
      parentRoute: typeof AuthImport
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthImport
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/chat/$chatId': {
      id: '/_app/chat/$chatId'
      path: '/chat/$chatId'
      fullPath: '/chat/$chatId'
      preLoaderRoute: typeof AppChatChatIdImport
      parentRoute: typeof AppImport
    }
    '/_app/chat/': {
      id: '/_app/chat/'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof AppChatIndexImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppDashboardRoute: typeof AppDashboardRoute
  AppSettingsRoute: typeof AppSettingsRoute
  AppSignoutRoute: typeof AppSignoutRoute
  AppVocabRoute: typeof AppVocabRoute
  AppIndexRoute: typeof AppIndexRoute
  AppChatChatIdRoute: typeof AppChatChatIdRoute
  AppChatIndexRoute: typeof AppChatIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppDashboardRoute: AppDashboardRoute,
  AppSettingsRoute: AppSettingsRoute,
  AppSignoutRoute: AppSignoutRoute,
  AppVocabRoute: AppVocabRoute,
  AppIndexRoute: AppIndexRoute,
  AppChatChatIdRoute: AppChatChatIdRoute,
  AppChatIndexRoute: AppChatIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

interface AuthRouteChildren {
  AuthForgotPasswordRoute: typeof AuthForgotPasswordRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthForgotPasswordRoute: AuthForgotPasswordRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthRouteWithChildren
  '/dashboard': typeof AppDashboardRoute
  '/settings': typeof AppSettingsRoute
  '/signout': typeof AppSignoutRoute
  '/vocab': typeof AppVocabRoute
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/': typeof AppIndexRoute
  '/chat/$chatId': typeof AppChatChatIdRoute
  '/chat': typeof AppChatIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/dashboard': typeof AppDashboardRoute
  '/settings': typeof AppSettingsRoute
  '/signout': typeof AppSignoutRoute
  '/vocab': typeof AppVocabRoute
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/': typeof AppIndexRoute
  '/chat/$chatId': typeof AppChatChatIdRoute
  '/chat': typeof AppChatIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteWithChildren
  '/_auth': typeof AuthRouteWithChildren
  '/_app/dashboard': typeof AppDashboardRoute
  '/_app/settings': typeof AppSettingsRoute
  '/_app/signout': typeof AppSignoutRoute
  '/_app/vocab': typeof AppVocabRoute
  '/_auth/forgot-password': typeof AuthForgotPasswordRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/register': typeof AuthRegisterRoute
  '/_app/': typeof AppIndexRoute
  '/_app/chat/$chatId': typeof AppChatChatIdRoute
  '/_app/chat/': typeof AppChatIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/dashboard'
    | '/settings'
    | '/signout'
    | '/vocab'
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/'
    | '/chat/$chatId'
    | '/chat'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/dashboard'
    | '/settings'
    | '/signout'
    | '/vocab'
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/'
    | '/chat/$chatId'
    | '/chat'
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_app/dashboard'
    | '/_app/settings'
    | '/_app/signout'
    | '/_app/vocab'
    | '/_auth/forgot-password'
    | '/_auth/login'
    | '/_auth/register'
    | '/_app/'
    | '/_app/chat/$chatId'
    | '/_app/chat/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_auth"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/dashboard",
        "/_app/settings",
        "/_app/signout",
        "/_app/vocab",
        "/_app/",
        "/_app/chat/$chatId",
        "/_app/chat/"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/forgot-password",
        "/_auth/login",
        "/_auth/register"
      ]
    },
    "/_app/dashboard": {
      "filePath": "_app/dashboard.tsx",
      "parent": "/_app"
    },
    "/_app/settings": {
      "filePath": "_app/settings.tsx",
      "parent": "/_app"
    },
    "/_app/signout": {
      "filePath": "_app/signout.tsx",
      "parent": "/_app"
    },
    "/_app/vocab": {
      "filePath": "_app/vocab.tsx",
      "parent": "/_app"
    },
    "/_auth/forgot-password": {
      "filePath": "_auth.forgot-password.tsx",
      "parent": "/_auth"
    },
    "/_auth/login": {
      "filePath": "_auth.login.tsx",
      "parent": "/_auth"
    },
    "/_auth/register": {
      "filePath": "_auth.register.tsx",
      "parent": "/_auth"
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/_app/chat/$chatId": {
      "filePath": "_app/chat.$chatId.tsx",
      "parent": "/_app"
    },
    "/_app/chat/": {
      "filePath": "_app/chat.index.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
