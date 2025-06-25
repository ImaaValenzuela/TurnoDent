'use client'

import DatabaseTest from './DatabaseTest'

export default function Dashboard() {
  const stats = [
    {
      title: 'Pacientes Activos',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: '👥',
      color: 'bg-blue-500'
    },
    {
      title: 'Odontólogos',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: '👨‍⚕️',
      color: 'bg-green-500'
    },
    {
      title: 'Turnos Hoy',
      value: '24',
      change: '-3',
      changeType: 'negative',
      icon: '📅',
      color: 'bg-purple-500'
    },
    {
      title: 'Reportes',
      value: '12',
      change: '+5',
      changeType: 'positive',
      icon: '📊',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menú Principal</h1>
        <button className="btn btn-primary">
          <span className="mr-2">📊</span>
          Generar Reporte
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <span className="text-2xl text-white">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 ml-1">desde el mes pasado</span>
            </div>
          </div>
        ))}
      </div>

      {/* Database Test */}
      <div className="mb-8">
        <DatabaseTest />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full btn btn-primary text-left">
              <span className="mr-2">👥</span>
              Nuevo Paciente
            </button>
            <button className="w-full btn btn-secondary text-left">
              <span className="mr-2">📅</span>
              Programar Turno
            </button>
            <button className="w-full btn btn-secondary text-left">
              <span className="mr-2">👨‍⚕️</span>
              Gestionar Odontólogos
            </button>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Nuevo paciente registrado</p>
                <p className="text-xs text-gray-600">María González - hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Turno confirmado</p>
                <p className="text-xs text-gray-600">Dr. López - 15:30 - hace 1 hora</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Reporte generado</p>
                <p className="text-xs text-gray-600">Estadísticas mensuales - hace 3 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 