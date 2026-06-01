'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TABS, ENV_COLORS, REPO_COLORS, statusLabel } from '../../../lib/columns'

const EMPTY = '<p style="color:#94a3b8">(chưa có nội dung)</p>'

function Badge({ text, color }) {
  if (!text) return null
  return (
    <span className="badge" style={{ background: color || '#64748b' }}>
      {text}
    </span>
  )
}

export default function TaskView({ task }) {
  const tabs = TABS[task.type]
  const [tab, setTab] = useState('overview')

  return (
    <div className="detail">
      <nav className="detail-nav">
        <Link href="/" className="back">
          ← Board
        </Link>
      </nav>

      <header className={`hero ${task.type === 'bug' ? 'hero-bug' : 'hero-feat'}`}>
        <div className="hero-kicker">
          {task.type === 'bug' ? '🐞 Bug' : '⚙️ Feature'} ·{' '}
          {statusLabel(task.type, task.status)}
        </div>
        <h1>{task.title}</h1>
        <div className="card-badges">
          <Badge text={task.repo} color={REPO_COLORS[task.repo]} />
          <Badge text={task.env} color={ENV_COLORS[task.env]} />
          {task.updated && <span className="hero-date">cập nhật {task.updated}</span>}
        </div>
      </header>

      <div className="detail-card">
        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={tab === t.key ? 'on' : ''}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tab-body">
          {tab === 'overview' ? (
            <>
              <table className="meta">
                <tbody>
                  <tr>
                    <th>Trạng thái</th>
                    <td>{statusLabel(task.type, task.status)}</td>
                  </tr>
                  <tr>
                    <th>Môi trường</th>
                    <td>{task.env}</td>
                  </tr>
                  <tr>
                    <th>Repo</th>
                    <td>{task.repo}</td>
                  </tr>
                  <tr>
                    <th>Branch</th>
                    <td>{task.branch || '—'}</td>
                  </tr>
                  <tr>
                    <th>MR</th>
                    <td>
                      {task.mr ? (
                        <a href={task.mr} target="_blank" rel="noreferrer">
                          {task.mr}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Cập nhật</th>
                    <td>{task.updated || '—'}</td>
                  </tr>
                </tbody>
              </table>
              {task.html.sources && (
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: task.html.sources }}
                />
              )}
            </>
          ) : (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: task.html[tab] || EMPTY }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
