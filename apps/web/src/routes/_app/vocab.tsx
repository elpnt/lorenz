import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/vocab')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/vocab"!</div>
}
