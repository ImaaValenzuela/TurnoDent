# TurnoDent - Frontend Next.js

Este es el frontend de la aplicación TurnoDent migrado de JSP a Next.js con TypeScript y Tailwind CSS.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Responsive Design** para móviles y desktop
- **Componentes reutilizables**

## 📁 Estructura del Proyecto

```
frontend-next/
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Página principal
│   │   ├── globals.css     # Estilos globales
│   │   └── usuarios/       # Páginas de usuarios
│   ├── components/         # Componentes reutilizables
│   │   ├── Sidebar.tsx     # Barra lateral
│   │   ├── Topbar.tsx      # Barra superior
│   │   └── Dashboard.tsx   # Panel principal
│   ├── lib/               # Utilidades
│   │   └── utils.ts       # Funciones de ayuda
│   └── types/             # Tipos TypeScript
│       └── index.ts       # Interfaces
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

4. **Ejecutar en producción:**
   ```bash
   npm start
   ```

## 🔄 Migración de JSP a Next.js

### Componentes Migrados

| JSP Original | Next.js Component | Descripción |
|--------------|-------------------|-------------|
| `sidebar.jsp` | `Sidebar.tsx` | Barra lateral con navegación |
| `topbar.jsp` | `Topbar.tsx` | Barra superior con acciones |
| `home.jsp` | `Dashboard.tsx` | Panel principal con estadísticas |
| `verUsuarios.jsp` | `usuarios/page.tsx` | Lista de usuarios |

### Entidades Migradas

Las entidades Java se han convertido a interfaces TypeScript:

```typescript
// Antes (Java)
@Entity
public class Usuario {
    private int idUsuario;
    private String nombre_usuario;
    private String contrasenia;
    private String rol;
}

// Ahora (TypeScript)
interface Usuario {
  idUsuario: number;
  nombre_usuario: string;
  contrasenia: string;
  rol: string;
}
```

### Estilos Migrados

- **Bootstrap** → **Tailwind CSS**
- **FontAwesome** → **Lucide React**
- **CSS personalizado** → **Componentes CSS con @apply**

## 🎨 Diseño y UX

### Paleta de Colores
- **Primary**: Azul (#3B82F6)
- **Secondary**: Gris (#6B7280)
- **Success**: Verde (#10B981)
- **Danger**: Rojo (#EF4444)
- **Warning**: Naranja (#F59E0B)

### Componentes Principales

1. **Sidebar**: Navegación principal con menús colapsables
2. **Topbar**: Barra superior con notificaciones y perfil
3. **Dashboard**: Panel con estadísticas y acciones rápidas
4. **Tablas**: Componentes de datos con búsqueda y filtros

## 🔧 Configuración

### Variables de Entorno
Crear archivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Tailwind CSS
El proyecto incluye configuración personalizada en `tailwind.config.js` con:
- Colores personalizados
- Componentes CSS reutilizables
- Responsive breakpoints

## 📱 Responsive Design

La aplicación es completamente responsive:
- **Mobile First**: Diseño optimizado para móviles
- **Tablet**: Adaptación para tablets
- **Desktop**: Experiencia completa en desktop

## 🚀 Próximos Pasos

1. **Conectar con Backend**: Integrar con la API Java existente
2. **Autenticación**: Implementar sistema de login
3. **Formularios**: Crear formularios para CRUD
4. **Validaciones**: Agregar validaciones de formularios
5. **Estado Global**: Implementar gestión de estado (Zustand/Redux)
6. **Testing**: Agregar tests unitarios y de integración

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles. 