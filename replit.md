# BootShop - E-commerce de Botas

## Descripción General
Aplicación de e-commerce Angular completa para la venta de botas con estructura profesional siguiendo patrones de arquitectura escalables.

## Estructura del Proyecto

### `/src/app/core/` - Servicios Singleton y Lógica Global
- **guards/** - Protección de rutas (auth.guard, admin.guard)
- **interceptors/** - Gestión de errores HTTP y tokens de sesión
- **models/** - Interfaces TypeScript (product, cart, user)
- **services/** - Servicios de negocio (product, cart, auth)
- **core.module.ts** - Configuración de servicios básicos

### `/src/app/shared/` - Componentes Reutilizables
- **components/**
  - `header/` - Barra superior con logo, búsqueda y menú
  - `footer/` - Información de contacto y redes sociales
  - `product-card/` - Tarjeta individual de producto
  - `chatbot/` - Asistente virtual flotante
  - `not-found/` - Página 404 personalizada
- **pipes/** - Transformación de datos (currency-mxn)

### `/src/app/features/` - Módulos de Funcionalidades (Lazy Loaded)
- `home/` - Landing page con banners y secciones principales
- `products/` - Catálogo completo con filtros
- `cart/` - Página de carrito con resumen
- `checkout/` - Proceso de pago y envío
- `auth/` - Login, registro y recuperación de contraseña
- `admin/` - Dashboard de gestión de stock y ventas

## Tecnologías
- **Angular 17** con Standalone Components
- **RxJS** para reactividad
- **TypeScript** para type-safety
- **Bootstrap CSS personalizado**

## Estado Actual
✅ Estructura completa creada
✅ Componentes base implementados
✅ Servicios configurados
✅ Guards de autenticación y admin
✅ Pipes personalizados
✅ Rutas definidas
✅ Workflow Angular corriendo en puerto 5000

## Próximos Pasos
- Conectar servicios a API backend
- Implementar formularios de auth con validaciones
- Agregar carrito con localStorage
- Implementar checkout con pasarela de pago
- Agregar filtros de productos avanzados
- Implementar admin dashboard
- Tests unitarios e integración

## Configuración de Desarrollo
```bash
npm start  # Inicia servidor dev en puerto 5000
npm build  # Compila para producción
npm test   # Ejecuta tests
```

## Notas
- El servidor corre en puerto 5000 (requerido por Replit)
- Se utiliza --disable-host-check para desarrollo local
- Componentes standalone para modularidad
- Estructureture profesional para escalabilidad
