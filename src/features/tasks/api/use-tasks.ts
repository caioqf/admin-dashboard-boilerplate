import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { handleServerError } from '@/utils/handle-server-error'
import { Task } from '../data/schema'
import { tasksService } from './tasks.service'

export const TASKS_QUERY_KEY = ['tasks'] as const

export function useTasksQuery() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: tasksService.getTasks,
  })
}

export function useTaskQuery(id: string) {
  return useQuery({
    queryKey: [...TASKS_QUERY_KEY, id] as const,
    queryFn: () => tasksService.getTask(id),
    enabled: !!id,
  })
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
      toast.success('Task created successfully!')
    },
    onError: handleServerError,
  })
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...task }: Task) => tasksService.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
      toast.success('Task updated successfully!')
    },
    onError: handleServerError,
  })
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
      toast.success('Task deleted successfully!')
    },
    onError: handleServerError,
  })
}

