import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/signout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/signout"!</div>
}
