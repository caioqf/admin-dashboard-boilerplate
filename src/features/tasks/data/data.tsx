import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconStopwatch,
} from '@tabler/icons-react'

export const getLabels = (t: (key: string) => string) => [
  {
    value: 'bug',
    label: t('task_label.bug'),
  },
  {
    value: 'feature',
    label: t('task_label.feature'),
  },
  {
    value: 'documentation',
    label: t('task_label.documentation'),
  },
]

export const getStatuses = (t: (key: string) => string) => [
  {
    value: 'backlog',
    label: t('task_status.backlog'),
    icon: IconExclamationCircle,
  },
  {
    value: 'todo',
    label: t('task_status.todo'),
    icon: IconCircle,
  },
  {
    value: 'in progress',
    label: t('task_status.in_progress'),
    icon: IconStopwatch,
  },
  {
    value: 'done',
    label: t('task_status.done'),
    icon: IconCircleCheck,
  },
  {
    value: 'canceled',
    label: t('task_status.canceled'),
    icon: IconCircleX,
  },
]

export const getPriorities = (t: (key: string) => string) => [
  {
    label: t('task_priority.low'),
    value: 'low',
    icon: IconArrowDown,
  },
  {
    label: t('task_priority.medium'),
    value: 'medium',
    icon: IconArrowRight,
  },
  {
    label: t('task_priority.high'),
    value: 'high',
    icon: IconArrowUp,
  },
]

// Keep the original exports for backward compatibility
export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: IconExclamationCircle,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: IconCircle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: IconStopwatch,
  },
  {
    value: 'done',
    label: 'Done',
    icon: IconCircleCheck,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: IconCircleX,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: IconArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: IconArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: IconArrowUp,
  },
]
