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
import { Route as AuthSignupImport } from './routes/_auth.signup'
import { Route as AuthLoginImport } from './routes/_auth.login'
import { Route as AuthForgotPasswordImport } from './routes/_auth.forgot-password'
import { Route as AppVocabImport } from './routes/_app/vocab'
import { Route as AppSettingsImport } from './routes/_app/settings'
import { Route as AppDashboardImport } from './routes/_app/dashboard'
import { Route as AppChatImport } from './routes/_app/chat'

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

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
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

const AppChatRoute = AppChatImport.update({
  id: '/chat',
  path: '/chat',
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
    '/_app/chat': {
      id: '/_app/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof AppChatImport
      parentRoute: typeof AppImport
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
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppChatRoute: typeof AppChatRoute
  AppDashboardRoute: typeof AppDashboardRoute
  AppSettingsRoute: typeof AppSettingsRoute
  AppVocabRoute: typeof AppVocabRoute
  AppIndexRoute: typeof AppIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppChatRoute: AppChatRoute,
  AppDashboardRoute: AppDashboardRoute,
  AppSettingsRoute: AppSettingsRoute,
  AppVocabRoute: AppVocabRoute,
  AppIndexRoute: AppIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

interface AuthRouteChildren {
  AuthForgotPasswordRoute: typeof AuthForgotPasswordRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthSignupRoute: typeof AuthSignupRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthForgotPasswordRoute: AuthForgotPasswordRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthSignupRoute: AuthSignupRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthRouteWithChildren
  '/chat': typeof AppChatRoute
  '/dashboard': typeof AppDashboardRoute
  '/settings': typeof AppSettingsRoute
  '/vocab': typeof AppVocabRoute
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/login': typeof AuthLoginRoute
  '/signup': typeof AuthSignupRoute
  '/': typeof AppIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/chat': typeof AppChatRoute
  '/dashboard': typeof AppDashboardRoute
  '/settings': typeof AppSettingsRoute
  '/vocab': typeof AppVocabRoute
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/login': typeof AuthLoginRoute
  '/signup': typeof AuthSignupRoute
  '/': typeof AppIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteWithChildren
  '/_auth': typeof AuthRouteWithChildren
  '/_app/chat': typeof AppChatRoute
  '/_app/dashboard': typeof AppDashboardRoute
  '/_app/settings': typeof AppSettingsRoute
  '/_app/vocab': typeof AppVocabRoute
  '/_auth/forgot-password': typeof AuthForgotPasswordRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/signup': typeof AuthSignupRoute
  '/_app/': typeof AppIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/chat'
    | '/dashboard'
    | '/settings'
    | '/vocab'
    | '/forgot-password'
    | '/login'
    | '/signup'
    | '/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/chat'
    | '/dashboard'
    | '/settings'
    | '/vocab'
    | '/forgot-password'
    | '/login'
    | '/signup'
    | '/'
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_app/chat'
    | '/_app/dashboard'
    | '/_app/settings'
    | '/_app/vocab'
    | '/_auth/forgot-password'
    | '/_auth/login'
    | '/_auth/signup'
    | '/_app/'
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
        "/_app/chat",
        "/_app/dashboard",
        "/_app/settings",
        "/_app/vocab",
        "/_app/"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/forgot-password",
        "/_auth/login",
        "/_auth/signup"
      ]
    },
    "/_app/chat": {
      "filePath": "_app/chat.tsx",
      "parent": "/_app"
    },
    "/_app/dashboard": {
      "filePath": "_app/dashboard.tsx",
      "parent": "/_app"
    },
    "/_app/settings": {
      "filePath": "_app/settings.tsx",
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
    "/_auth/signup": {
      "filePath": "_auth.signup.tsx",
      "parent": "/_auth"
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
