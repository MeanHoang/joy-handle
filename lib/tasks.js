import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { TABS } from './columns'

const TASKS_DIR = path.join(process.cwd(), 'tasks')

// 1 task = 1 folder: tasks/<slug>/{_meta.md, ba.md, plan.md, dev.md, review.md}

function readMd(dir, name) {
  const p = path.join(dir, name)
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : ''
}

function render(md) {
  const t = (md || '').trim()
  return t ? marked.parse(t) : ''
}

export function getTasks() {
  if (!fs.existsSync(TASKS_DIR)) return []
  const slugs = fs
    .readdirSync(TASKS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => d.name)

  return slugs
    .map((slug) => {
      const dir = path.join(TASKS_DIR, slug)
      const { data, content } = matter(readMd(dir, '_meta.md'))
      const type = data.type === 'bug' ? 'bug' : 'feature'

      // Read only the files this type's tabs define (overview has no file).
      const html = { sources: render(content) }
      for (const tab of TABS[type]) {
        if (tab.file) html[tab.key] = render(readMd(dir, tab.file))
      }

      return {
        slug,
        title: data.title || slug,
        type,
        status: String(data.status || '').trim(),
        env: data.env || 'local',
        repo: data.repo || '',
        branch: data.branch || '',
        mr: data.mr || '',
        updated: data.updated ? String(data.updated) : '',
        html,
      }
    })
    .sort((a, b) => (a.updated < b.updated ? 1 : -1))
}
