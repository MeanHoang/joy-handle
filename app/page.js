import { getTasks } from '../lib/tasks'
import Board from './board'

// Static: tasks are read from tasks/*.md at build time.
// To update the board: edit a card, push to git → Vercel redeploys.
export default function Page() {
  const tasks = getTasks()
  return <Board tasks={tasks} />
}
