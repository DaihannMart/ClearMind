# Equilibrio Estudiantil — Documento de Formulación del Proyecto

**Corporación Universitaria Iberoamericana | Facultad de Ingeniería**  
**Asignatura:** Proyecto de Software | **Docente:** Tatiana Cabrera  
**Equipo:** Sergio Armando Ladino Ocampo · Juan David Fernández Farfán · Yadir Hernando Contreras Parraga · Nicoll Daihann Piza Martínez

---

## 1. Introducción

Los entornos educativos enfrentan un desafío creciente relacionado con la salud mental y el bienestar de los estudiantes. La carga académica, la presión por el rendimiento, la transición a la vida universitaria y la gestión del tiempo pueden derivar en altos niveles de estrés, ansiedad y hábitos poco saludables.

**Equilibrio Estudiantil** es una solución tecnológica alineada con la investigación *"Mente Activa – Bienestar Mental y Hábitos Digitales"*. Busca diseñar y planificar un aplicativo web que permita a estudiantes universitarios monitorizar sus hábitos de estudio y su bienestar emocional.

---

## 2. Problema

### Descripción

El **Burnout estudiantil** (agotamiento académico) es una condición creciente en la educación superior, caracterizada por:

- Agotamiento emocional
- Despersonalización
- Insatisfacción por logros personales

El mal uso de la tecnología, las notificaciones constantes, la procrastinación generada por redes sociales y la incapacidad de establecer límites entre tiempo de estudio y tiempo personal hacen que los estudiantes carezcan de herramientas para rastrear su carga académica y recibir alertas sobre patrones de sobrecarga antes de que evolucionen a problemas graves de salud mental.

### Contextualización

El problema se sitúa en la educación superior, especialmente en programas de alta carga académica como ingenierías, ciencias y arquitectura. La transición a modalidades híbridas y 100% digitales ha incrementado las horas frente a pantallas y reducido la desconexión real del entorno académico.

### Población afectada

- **Directa:** Estudiantes de pregrado y posgrado que experimentan síntomas de sobrecarga académica y dificultad para gestionar el tiempo en pantallas.
- **Indirecta:** Instituciones interesadas en reducir la deserción escolar asociada a salud mental, docentes que buscan estrategias de apoyo al bienestar, y familias de los estudiantes.

### Justificación de la solución tecnológica

La aplicación web combina el seguimiento de hábitos digitales con indicadores de bienestar emocional, con la capacidad de **correlacionar el uso de la tecnología con el estado emocional del usuario**. A diferencia de simples temporizadores de pantalla, no solo mide el tiempo sino que lo contextualiza en el entorno académico y emocional del estudiante.

---

## 3. Objetivos

### Objetivo General

Desarrollar un aplicativo web que permita a estudiantes universitarios monitorear hábitos digitales y cargas académicas, generando alertas de riesgo sobre el agotamiento y recomendaciones para promover una relación saludable con la tecnología.

### Objetivos Específicos

1. Implementar un sistema de registro de actividades académicas que permita categorizar y medir el tiempo dedicado a diferentes tareas o materias.
2. Desarrollar un módulo de análisis que relacione el tiempo de uso de la plataforma con indicadores de estrés autorreportados, generando alertas personalizadas de riesgo de agotamiento.
3. Diseñar un panel de visualización de tendencias semanales de productividad vs. bienestar, para identificar tiempos de mayor eficiencia y puntos de saturación.
4. Incorporar un sistema de objetivos de hábitos con seguimiento visual del progreso.

---

## 4. Alcance

### Dentro del alcance

- Registro de usuario (carrera, semestre, lista de materias)
- Temporizador de estudio tipo Pomodoro con categorías personalizables por materia
- Registro de nivel de energía y estrés asociado a cada sesión
- Tablero de control web con métricas: horas de estudio, promedio de estrés por materia, tendencia de productividad

### Fuera del alcance

- Bloqueo o restricción forzada de otras páginas o aplicativos (no es un control parental)
- Diagnóstico clínico de trastornos de salud mental
- Integración con plataformas institucionales
- Funcionalidad offline

### Beneficios previstos

- Reducción de la procrastinación gracias a la estructuración consciente del tiempo de estudio
- Identificación temprana de patrones de sobrecarga académica
- Accesibilidad multiplataforma desde cualquier navegador sin instalación adicional

---

## 5. Metodología de Desarrollo

### Enfoque: Scrum

El equipo adoptó **Scrum** como metodología ágil, organizando el desarrollo en sprints cortos para entregar el proyecto de forma incremental y permitir su evolución continua.

### Roles del equipo

| Rol | Asignado a | Responsabilidad |
|---|---|---|
| Product Owner | Juan David Fernández Farfán | Definición y priorización del product backlog; intermediario con Stakeholders |
| Scrum Master | Sergio Armando Ladino Ocampo | Facilitación de ceremonias Scrum, eliminación de impedimentos, mejora continua |
| Development Team | Yadir Contreras Parraga & Nicoll Piza Martínez | Desarrollo, pruebas y despliegue (frontend React, backend Node.js, MongoDB) |

### Planificación de Sprints

| Sprint | Duración | Objetivo |
|---|---|---|
| Sprint 1 | 3 semanas | Configuración del proyecto, registro de materias |
| Sprint 2 | 3 semanas | Temporizador Pomodoro, visualización básica de métricas |
| Sprint 3 | 3 semanas | Registro de niveles de energía y estrés |
| Sprint 4 | 3 semanas | Pruebas de usabilidad y ajustes finales |

Cada sprint incluye: Sprint Planning, Daily Scrum (semanal, 15 min), Sprint Review y Sprint Retrospective.

### Herramientas de gestión

| Herramienta | Propósito |
|---|---|
| Jira | Product Backlog, Sprint Backlog, seguimiento de tareas y avances |
| GitHub | Control de versiones, pull requests, git flow |
| Teams / Meet / Discord | Comunicación sincrónica del equipo |
| Google Drive | Almacenamiento de documentación |
| Figma | Diseño de prototipos de interfaz web |

---

## 6. Requisitos del Sistema

### Requisitos Funcionales

| ID | Requisito | Descripción |
|---|---|---|
| RF01 | Registro | El sistema debe permitir el registro de usuarios |
| RF02 | Perfil | El sistema debe permitir configurar carrera, semestre y lista de materias |
| RF03 | Temporizador Pomodoro | Temporizador configurable con opciones de iniciar, pausar y finalizar por materia |
| RF04 | Registro de bienestar | Al finalizar cada sesión, el usuario califica energía y estrés del 1 al 5 |
| RF05 | Panel de métricas | Tablero con gráficos de horas de estudio, evolución de estrés y resumen semanal |
| RF06 | Alertas | Límites de tiempo configurables con notificaciones del navegador al alcanzarlos |

### Requisitos No Funcionales

| ID | Categoría | Requisito | Descripción |
|---|---|---|---|
| RFN01 | Seguridad | Almacenamiento seguro | Comunicación mediante HTTPS |
| RFN02 | Seguridad | Privacidad de datos | Datos de bienestar privados, sin compartir con terceros sin consentimiento |
| RFN03 | Rendimiento | Tiempo de respuesta | APIs con respuesta máxima de 500 ms en operaciones CRUD estándar |
| RFN04 | Rendimiento | Precisión del temporizador | Precisión mantenida incluso con la pestaña minimizada |
| RFN05 | Disponibilidad | Tiempo de actividad | Disponibilidad del 99% durante el periodo de prueba |
| RFN06 | Usabilidad | Diseño responsive | Interfaz adaptable a diferentes resoluciones de pantalla |
| RFN07 | Compatibilidad | Navegadores | Funciona en cualquier navegador |
| RFN08 | Escalabilidad | Capacidad de crecimiento | Arquitectura preparada para escalar y soportar mayor tráfico |

---

## 7. Stakeholders y Usuarios Finales

### Stakeholders

| Stakeholder | Interés en el proyecto | Nivel de influencia |
|---|---|---|
| Docente de la asignatura | Evalúa calidad técnica y cumplimiento de objetivos | Alto |
| Coordinación del programa | Herramienta que contribuya a reducir deserción estudiantil | Medio |
| Servicios de bienestar universitario | Usa datos agregados anónimos para políticas de acompañamiento | Medio |
| Familia del estudiante | Apoyo al bienestar durante la formación | Bajo |

### Usuarios Finales

| Tipo de Usuario | Descripción | Relación con el sistema |
|---|---|---|
| Estudiante de pregrado | Carreras de alta carga académica, familiarizado con herramientas digitales | Usuario principal; usa la app diariamente para gestionar sesiones, monitorizar bienestar y recibir alertas |
| Estudiante de posgrado | Responsabilidades más complejas, valora la eficiencia y la autoevaluación | Usuario avanzado; optimiza tiempo limitado y registra la carga del estudio |

---

## 8. Historias de Usuario

| ID | Historia de Usuario |
|---|---|
| HU-01 | Como estudiante universitario, quiero registrarme con mi correo electrónico para acceder a mis datos de manera segura y personalizada. |
| HU-02 | Como estudiante, quiero registrar mi estado emocional diario con una escala del 1 al 5 y notas adicionales, para llevar un seguimiento de cómo me siento a lo largo del tiempo. |
| HU-03 | Como estudiante, quiero crear micro-hábitos personalizados (meditar, leer, hacer ejercicio) para establecer rutinas saludables que mejoren mi bienestar. |
| HU-04 | Como estudiante, quiero marcar mis hábitos como completados cada día para ver mi racha actual y sentirme motivado a mantener la constancia. |
| HU-05 | Como estudiante, quiero visualizar gráficos con la evolución de mis emociones y cumplimiento de hábitos para identificar patrones y mejorar mi salud mental. |
| HU-06 | Como estudiante, quiero recibir insignias al alcanzar logros (como 7 días seguidos registrando emociones) para sentirme motivado y reconocido por mi constancia. |
| HU-07 | Como estudiante, quiero editar o eliminar entradas emocionales incorrectas para mantener mi diario emocional preciso y confiable. |

---

## 9. Solución Tecnológica

**Equilibrio Estudiantil** es una aplicación web de una única página (SPA), diseñada para navegadores web. Funciona como un compañero de estudio que combina un temporizador Pomodoro con un diario de bienestar académico, permitiendo al estudiante no solo gestionar su tiempo sino comprender los hábitos que afectan su estado emocional.

### Características clave

- Acceso mediante navegador web, sin instalación ni descargas adicionales
- Interfaz responsive adaptable a diferentes tipos de pantalla
- Actualizaciones automáticas

### Arquitectura general (3 capas)

**Capa 1 — Cliente (Navegador Web)**
- Aplicación React (SPA)
- Módulos: Login Web, Register Web, Timer Web, Dashboard Web
- Alojamiento: Vercel o Netlify con CDN global

**Capa 2 — Servidor (Backend)**
- API REST con Node.js + Express
- Endpoints: `/api/auth`, `/api/subjects`, `/api/sessions`, `/api/wellness`
- Alojamiento: Render o Railway

**Capa 3 — Base de Datos (NoSQL)**
- MongoDB Atlas (Nube)
- Colecciones: usuarios, materias, sesiones, registros_bienestar, pausas_activas

---

## 10. Conclusiones

- El **Burnout estudiantil** es una condición prevalente en educación superior, especialmente en carreras de alta carga. La falta de herramientas que correlacionen tiempo de estudio con bienestar emocional representa una brecha que el proyecto busca cerrar, con foco en la **autorregulación** y no en el control externo.

- **Scrum** garantiza entregas incrementales y adaptabilidad. La planificación en 4 sprints de 3 semanas cada uno permite estructurar el desarrollo desde la configuración inicial hasta las pruebas de usabilidad.

- Los requisitos funcionales y no funcionales definidos (seguridad HTTPS, disponibilidad del 99%, diseño responsive, escalabilidad) establecen una base sólida para que la aplicación sea útil, confiable y accesible.

- El modelamiento del sistema (diagrama de clases, casos de uso, secuencia y entidad-relación) demuestra la viabilidad técnica. La arquitectura React + Node.js + MongoDB permite escalar el proyecto en fases posteriores, mientras que el diseño centrado en el usuario garantiza una experiencia intuitiva y motivante.
