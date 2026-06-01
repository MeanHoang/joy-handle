import { notFound } from 'next/navigation'
import { getTasks } from '../../../lib/tasks'
import TaskView from './task-view'

export function generateStaticParams() {
  return getTasks().map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }) {
  const task = getTasks().find((t) => t.slug === params.slug)
  return { title: task ? `${task.title} — Joyllibee 🐝` : 'Joyllibee 🐝' }
}

export default function TaskPage({ params }) {
  const task = getTasks().find((t) => t.slug === params.slug)
  if (!task) notFound()
  return <TaskView task={task} />
}
