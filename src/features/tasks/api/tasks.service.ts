import { apiClient } from '@/lib/api-client'
import { Task } from '../data/schema'

export const tasksService = {
  getTasks: async () => {
    const { data } = await apiClient.get<Task[]>('/tasks')
    return data
  },

  getTask: async (id: string) => {
    const { data } = await apiClient.get<Task>(`/tasks/${id}`)
    return data
  },

  createTask: async (task: Omit<Task, 'id'>) => {
    const { data } = await apiClient.post<Task>('/tasks', task)
    return data
  },

  updateTask: async (id: string, task: Partial<Task>) => {
    const { data } = await apiClient.patch<Task>(`/tasks/${id}`, task)
    return data
  },

  deleteTask: async (id: string) => {
    await apiClient.delete(`/tasks/${id}`)
  },
}

