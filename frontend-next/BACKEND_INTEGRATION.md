# Integración con Backend Java

Este documento describe cómo conectar el frontend Next.js con el backend Java existente.

## 🔧 Configuración del Backend

### 1. Dependencias Requeridas

Agregar Gson al `pom.xml` para el manejo de JSON:

```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

### 2. Nuevo Servlet API

Se ha creado `ApiUsuarioServlet.java` que proporciona endpoints REST:

- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/{id}` - Obtener usuario por ID
- `POST /api/usuarios` - Crear nuevo usuario
- `PUT /api/usuarios` - Actualizar usuario
- `DELETE /api/usuarios?id={id}` - Eliminar usuario

### 3. Configuración CORS

El servlet incluye headers CORS para permitir peticiones desde el frontend:

```java
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
```

## 🔗 Configuración del Frontend

### 1. Variables de Entorno

Crear archivo `.env.local` en el directorio `frontend-next`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/TurnoDent
```

### 2. Servicios API

Los servicios están organizados en:

- `src/services/api.ts` - Servicio base para HTTP requests
- `src/services/usuarioService.ts` - Servicios específicos para usuarios
- `src/hooks/useUsuarios.ts` - Hook personalizado para estado de usuarios

### 3. Estructura de Datos

Los tipos TypeScript coinciden con las entidades Java:

```typescript
interface Usuario {
  idUsuario: number;
  nombre_usuario: string;
  contrasenia: string;
  rol: string;
}
```

## 🚀 Cómo Usar

### 1. Iniciar el Backend

```bash
# En NetBeans o desde línea de comandos
mvn clean install
mvn tomcat7:run
```

### 2. Iniciar el Frontend

```bash
cd frontend-next
npm install
npm run dev
```

### 3. Acceder a la Aplicación

- Frontend: http://localhost:3000
- Backend: http://localhost:8080/TurnoDent

## 📡 Endpoints Disponibles

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios` | Actualizar usuario |
| DELETE | `/api/usuarios?id={id}` | Eliminar usuario |

### Parámetros POST/PUT

```json
{
  "nombreUsuario": "usuario123",
  "contrasenia": "password123",
  "rol": "Secretario"
}
```

### Respuestas

#### Éxito
```json
{
  "message": "Usuario creado exitosamente"
}
```

#### Error
```json
{
  "error": "Mensaje de error"
}
```

## 🔄 Migración Gradual

### Fase 1: Coexistencia
- Mantener servlets JSP existentes
- Agregar nuevos endpoints API
- Frontend usa API para nuevas funcionalidades

### Fase 2: Migración Completa
- Reemplazar servlets JSP con endpoints API
- Actualizar frontend para usar solo API
- Eliminar código JSP obsoleto

### Fase 3: Optimización
- Implementar autenticación JWT
- Agregar validaciones avanzadas
- Optimizar consultas de base de datos

## 🛠️ Troubleshooting

### Error de CORS
Si aparecen errores de CORS, verificar:
1. Headers CORS en el servlet
2. URL correcta en variables de entorno
3. Puerto del servidor Java

### Error de Conexión
Si no se puede conectar al backend:
1. Verificar que el servidor Java esté ejecutándose
2. Comprobar la URL en `NEXT_PUBLIC_API_URL`
3. Revisar logs del servidor

### Datos Mock
Si el backend no está disponible, el frontend usa datos mock automáticamente.

## 📝 Próximos Pasos

1. **Implementar autenticación JWT**
2. **Crear endpoints para otras entidades** (Pacientes, Odontólogos, etc.)
3. **Agregar validaciones del lado servidor**
4. **Implementar manejo de errores avanzado**
5. **Agregar logging y monitoreo**
6. **Optimizar rendimiento con caché**

## 🔒 Seguridad

### Consideraciones
- Implementar autenticación JWT
- Validar inputs del servidor
- Usar HTTPS en producción
- Implementar rate limiting
- Sanitizar datos de entrada

### Headers de Seguridad
```java
response.setHeader("X-Content-Type-Options", "nosniff");
response.setHeader("X-Frame-Options", "DENY");
response.setHeader("X-XSS-Protection", "1; mode=block");
``` 