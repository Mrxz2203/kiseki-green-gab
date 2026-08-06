# 🎵 Carta Musical: Kiseki (Milagro)

Una aplicación web interactiva desarrollada con **React.js** para la lectura sincrónica de una adaptación poética de la canción *Kiseki* de GReeeeN. Permite al usuario explorar la letra estrofa por estrofa o activar un modo de sincronización automática en tiempo real con la pista de audio.

---

## 📋 Tabla de Contenidos

- [🎵 Carta Musical: Kiseki (Milagro)](#-carta-musical-kiseki-milagro)
  - [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [📌 Descripción del Proyecto](#-descripción-del-proyecto)
  - [✨ Características Principales](#-características-principales)
  - [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
  - [📁 Estructura del Proyecto](#-estructura-del-proyecto)

---

## 📌 Descripción del Proyecto

**Carta Musical** combina la lectura de un poema/adaptación lírica con un reproductor de audio sincronizado. El usuario puede avanzar de forma manual página por página (hasta 21 estrofas) o habilitar el modo de sincronización para que el texto cambie automáticamente según los sellos de tiempo exactos del audio `Kiseki.mp3`.

---

## ✨ Características Principales

- **Navegación Dual**:
  - **Modo Sincronizado**: Cambia las páginas de texto automáticamente monitoreando `currentTime` de la canción.
  - **Modo Lectura Libre**: Avance manual mediante el botón *"Continuar leyendo"* o seleccionando los puntos de paginación.
- **Modal de Confirmación**: Interfaz informativa previa para habilitar la reproducción automática sincronizada.
- **Controles e Indicadores de Audio**:
  - Botón interactivo para pausar/reproducir audio.
  - Contador de tiempo transcurrido / total (`mm:ss`)[cite: 8].
  - Indicador visual animado cuando el modo sincronización está activo[cite: 8].
- **Llamado a Acción Externo**: Enlace directo para consultar la canción original externa en YouTube[cite: 8].
- **Diseño Atmosférico**:
  - Fondo de imagen con desenfoque suave (`blur: 10px`) y un gradiente radial estilo romántico[cite: 8].
  - Animaciones CSS como `aparecer-suave`, `latido` en títulos y `flotar` en flechas de avance[cite: 8].

---

## 🛠️ Tecnologías Utilizadas

- **React.js**: Manejo de estado (`useState`), referencias DOM (`useRef`) y efectos de ciclo de vida (`useEffect`)[cite: 8].
- **Lucide React**: Iconografía dinámica (`Play`, `Pause`, `ExternalLink`, `ChevronDown`, `Clock`, `Radio`)[cite: 8].
- **CSS3 / Flexbox**: Animaciones personalizadas con `@keyframes`, propiedades dinámicas vía CSS variables y diseño adaptativo[cite: 8].

---

## 📁 Estructura del Proyecto

```text
carta-musical/
├── src/
│   ├── assets/
│   │   ├── Kiseki.mp3           # Archivo de audio principal
│   │   └── Shipp.jpg            # Imagen de fondo para el contenedor
│   ├── components/
│   │   ├── CartaMusical.js      # Componente principal con la lógica e interacciones
│   │   └── CartaMusical.css     # Estilos de la carta, animaciones y modales
│   ├── App.js                   # Componente raíz de la aplicación
│   ├── App.css                  # Estilos globales y reset CSS
│   └── index.js                 # Punto de entrada de React
└── package.json