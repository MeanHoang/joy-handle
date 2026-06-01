// Kanban columns per task type — derived from BRIEF.md's two dev flows.
// status values in tasks/*.md must use one of the `key`s below for their type.

export const COLUMNS = {
  feature: [
    { key: 'gather', label: 'Tổng hợp' },
    { key: 'verify', label: 'Verify' },
    { key: 'plan', label: 'Plan' },
    { key: 'coding', label: 'Coding' },
    { key: 'review', label: 'Review' },
    { key: 'deploy', label: 'Deploy' },
    { key: 'done', label: 'Done' },
  ],
  bug: [
    { key: 'localize', label: 'Khoanh vùng' },
    { key: 'reproduce', label: 'Tái hiện' },
    { key: 'identify', label: 'Xác định' },
    { key: 'fix', label: 'Sửa lỗi' },
    { key: 'review', label: 'Review' },
    { key: 'deploy', label: 'Deploy' },
    { key: 'done', label: 'Done' },
  ],
}

export const REPOS = ['joy', 'joy-2', 'joy-3']

export const ENV_COLORS = {
  local: '#6b7280',
  staging: '#d97706',
  production: '#dc2626',
}

export const REPO_COLORS = {
  joy: '#2563eb',
  'joy-2': '#7c3aed',
  'joy-3': '#0d9488',
}

export function statusLabel(type, status) {
  const col = (COLUMNS[type] || []).find((c) => c.key === status)
  return col ? col.label : status || '—'
}

// Detail-page tabs per type. `overview` is auto (meta + sources, no file);
// every other tab maps to one markdown file in the task folder.
export const TABS = {
  feature: [
    { key: 'overview', label: 'Tổng hợp' },
    { key: 'ba', label: 'Phân tích', file: 'ba.md' },
    { key: 'plan', label: 'Plan', file: 'plan.md' },
    { key: 'dev', label: 'Theo dõi tiến độ', file: 'dev.md' },
    { key: 'review', label: 'Review', file: 'review.md' },
  ],
  bug: [
    { key: 'overview', label: 'Tổng hợp' },
    { key: 'fix', label: 'Nguyên nhân & giải pháp', file: 'fix.md' },
  ],
}
