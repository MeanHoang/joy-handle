'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { COLUMNS, REPOS, ENV_COLORS, REPO_COLORS } from '../lib/columns'

function Badge({ text, color }) {
  if (!text) return null
  return (
    <span className="badge" style={{ background: color || '#64748b' }}>
      {text}
    </span>
  )
}

export default function Board({ tasks }) {
  const [type, setType] = useState('feature') // feature | bug
  const [repo, setRepo] = useState('all')

  const columns = COLUMNS[type]

  const visible = useMemo(
    () =>
      tasks.filter(
        (t) => t.type === type && (repo === 'all' || t.repo === repo)
      ),
    [tasks, type, repo]
  )

  const byColumn = useMemo(() => {
    const map = Object.fromEntries(columns.map((c) => [c.key, []]))
    for (const t of visible) {
      if (map[t.status]) map[t.status].push(t)
      else map[columns[0].key].push(t) // unknown status → first column
    }
    return map
  }, [visible, columns])

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          Joyllibee <span className="bee">🐝</span>
        </div>
        <div className="controls">
          <div className="seg">
            <button
              className={type === 'feature' ? 'on' : ''}
              onClick={() => setType('feature')}
            >
              ⚙️ Feature
            </button>
            <button
              className={type === 'bug' ? 'on' : ''}
              onClick={() => setType('bug')}
            >
              🐞 Bug
            </button>
          </div>
          <select value={repo} onChange={(e) => setRepo(e.target.value)}>
            <option value="all">Tất cả repo</option>
            {REPOS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="board">
        {columns.map((col, i) => (
          <div className="col" key={col.key}>
            <div className="col-head" data-col={i}>
              <span>{col.label}</span>
              <span className="count">{byColumn[col.key].length}</span>
            </div>
            <div className="col-body">
              {byColumn[col.key].map((t) => (
                <Link className="card" key={t.slug} href={`/task/${t.slug}`}>
                  <div className="card-title">{t.title}</div>
                  <div className="card-badges">
                    <Badge text={t.repo} color={REPO_COLORS[t.repo]} />
                    <Badge text={t.env} color={ENV_COLORS[t.env]} />
                  </div>
                  <div className="card-foot">
                    {t.mr ? <span className="mr">🔗 MR</span> : <span />}
                    <span className="date">{t.updated}</span>
                  </div>
                </Link>
              ))}
              {byColumn[col.key].length === 0 && <div className="empty">—</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
