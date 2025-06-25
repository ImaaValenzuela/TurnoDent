const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/TurnoDent'

export interface ApiError {
  message: string
  status?: number
}

class ApiService {
  private baseURL: string

  constructor() {
    this.baseURL = API_BASE_URL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    const config: RequestInit = {
      ...options,
      headers: defaultHeaders,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Para endpoints que devuelven JSON
      if (response.headers.get('content-type')?.includes('application/json')) {
        return await response.json()
      }

      // Para endpoints que devuelven texto o redirecciones
      return await response.text() as T
    } catch (error) {
      console.error('API request failed:', error)
      throw new Error(
        error instanceof Error ? error.message : 'Error de conexión'
      )
    }
  }

  // Métodos HTTP
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // Método para formularios (multipart/form-data)
  async postForm<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.text() as T
    } catch (error) {
      console.error('API form request failed:', error)
      throw new Error(
        error instanceof Error ? error.message : 'Error de conexión'
      )
    }
  }
}

export const apiService = new ApiService() 