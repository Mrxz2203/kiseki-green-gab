import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ExternalLink, ChevronDown, Clock, Radio } from 'lucide-react';
import './CartaMusical.css';

import Kiseki from '../assets/Kiseki.mp3';
import Shipp from '../assets/Shipp.jpg';

// Definir los rangos de tiempo para cada página (en segundos)
const tiemposPaginas = {
  1: { inicio: 0, fin: 20 },
  2: { inicio: 21, fin: 41 },
  3: { inicio: 42, fin: 51 },
  4: { inicio: 52, fin: 63 },
  5: { inicio: 64, fin: 73 },
  6: { inicio: 74, fin: 84 },
  7: { inicio: 85, fin: 105 },
  8: { inicio: 106, fin: 128 },
  9: { inicio: 129, fin: 137 },
  10: { inicio: 138, fin: 147 },
  11: { inicio: 148, fin: 157 },
  12: { inicio: 158, fin: 172 },
  13: { inicio: 173, fin: 181 },
  14: { inicio: 182, fin: 190 },
  15: { inicio: 191, fin: 200 },
  16: { inicio: 201, fin: 212 },
  17: { inicio: 213, fin: 222 },
  18: { inicio: 223, fin: 233 },
  19: { inicio: 234, fin: 246 },
  20: { inicio: 247, fin: 258 },
  21: { inicio: 259, fin: 271 },
};

export default function CartaMusical() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [sincronizacionActiva, setSincronizacionActiva] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const audioRef = useRef(null);

  // Cargar duración cuando el audio esté listo
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Sincronización automática con la música
  useEffect(() => {
    if (!sincronizacionActiva) return;

    // Encontrar la página correspondiente al tiempo actual
    for (let pagina = 1; pagina <= 21; pagina++) {
      const { inicio, fin } = tiemposPaginas[pagina];
      if (currentTime >= inicio && currentTime <= fin) {
        setCurrentPage(pagina);
        break;
      }
    }
  }, [currentTime, sincronizacionActiva]);

  // Formatear segundos a mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const goToNextPage = () => {
    if (currentPage < 21) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToOtraCarta = () => {
    window.open('https://www.youtube.com/watch?v=DwTinTO0o9I&list=RDDwTinTO0o9I&start_radio=1', '_blank');
  };

  const activarSincronizacion = () => {
    setMostrarModal(true);
  };

  const confirmarSincronizacion = () => {
    setSincronizacionActiva(true);
    setMostrarModal(false);
    
    // Reproducir automáticamente si no está reproduciendo
    if (!isPlaying && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const desactivarSincronizacion = () => {
    setSincronizacionActiva(false);
  };

  const cartas = {
1: {
     titulo: 'Kiseki - Milagro',
      texto: `Adaptacion de la cancion Kiseki de Green - Especial San Valentin.`
    }, 
    2: {
     titulo: 'Kiseki - Milagro',
      texto: `¡Te amaré! Aún más de lo que te amo hoy.
Son sentimientos que no se detendrán.
¡Ahora mismo! Estoy tan enamorado.
No sé como explicarte...`
    }, 
    3: {
      titulo: 'Kiseki - Milagro',
      texto: `Los días que vivimos se unen
en nuestros caminos.
(¡Es un milagro!)`
    },
     4: {
      titulo: 'Kiseki - Milagro',
      texto: `¿Y si conocernos fue solo suerte?
¿o fue el destino?
¡El conocerte
es un milagro!`
    },
    5: {
      titulo: 'Kiseki - Milagro',
      texto: `Vivimos mientras sonreímos
así es nuestra historia.
Reiría por siempre si estás aquí.
`
    },
    6: {
      titulo: 'Kiseki - Milagro',
      texto: `Gracias… y ahh...
Te amo, tanto.
Solo déjame decirte,
que soy tan feliz.`
    },
    7: {
      titulo: 'Kiseki - Milagro',
      texto: `Tenerte por siempre aquí a mi lado
mientras solo me sostienes, 
me deja tan vulnerable
y tan enamorado.`
    },
    8: {
      titulo: 'Kiseki - Milagro',
      texto: `En nuestro día a día nacen alegrías,
mientras recorremos este milagro!
Encontrarnos pudo ser una coincidencia
pero en este mundo,
se le llama un ¡milagro!`
    },
    9: {
      titulo: 'Kiseki - Milagro',
      texto: `Incluso en los días oscuros
solo luces vendrán.
La soledad y el dolor se marcharán.`
    },
10: {
      titulo: 'Kiseki - Milagro',
      texto: `Soy yo mismo.
Sí, tú estás.
Así que, solo escuchame,
esto es por ti.`
    },
    11: {
      titulo: 'Kiseki - Milagro',
      texto: `Aquellos días de camino a casa
se volvieron momentos eternos,
fue cuando abrí mi corazón
y te conocí realmente.`
    },
    12: {
      titulo: 'Kiseki - Milagro',
      texto: `Después de aceptarme
en este amor que nos llena.
Seguimos caminando hacia el 
futuro que nos tocará vivir
es uno donde no estaré...`
    },
    13: {
      titulo: 'Kiseki - Milagro',
      texto: `...`
    },
    14: {
      titulo: 'Kiseki - Milagro',
      texto: `Supongamos que...
si me perdiera...
en la oscuridad...
serias mi luz.`
    },
    15: {
      titulo: 'Kiseki - Milagro',
      texto: `Vivimos mientras sonreímos
así es nuestra historia.
Reiría por siempre si estás aquí.`
    },
    16: {
      titulo: 'Kiseki - Milagro',
      texto: `Gracias… y ahh...
Te amo, tanto.
Solo déjame decirte,
que soy tan feliz.`
    },
    17: {
      titulo: 'Kiseki - Milagro',
      texto: `Aunque haya días difíciles
juntos los superaremos.
Compartamos nuestras penas y nuestras risas.`
    },
    18: {
      titulo: 'Kiseki - Milagro',
      texto: `Soy yo mismo.
Sí, tú estás.
Así que, solo te pido,
que te quedes...`
    },
    19: {
      titulo: 'Kiseki - Milagro',
      texto: `Hasta mi último día...` 
    },
    20: {
      titulo: 'Kiseki - Milagro',
      texto: `¡Finalmente entendí mi razón de existir!
Es porque estás junto a mí
que aprendí a vivir.`
    },
    21: {
      titulo: 'Kiseki - Milagro',
      texto: `Pasen los años,
en el tiempo que me toque estar,
siempre te amaría.`
    }
  };

  const carta = cartas[currentPage];

  return (
    <div
      className="carta-container"
      style={{ '--bg-image': `url(${Shipp})` }}
    >
      <audio ref={audioRef} src={Kiseki} loop />

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h2 className="modal-titulo">Sincronización con la música</h2>
            <p className="modal-texto">
  Ahora la letra se adaptará al ritmo de la canción automáticamente.
  Las páginas cambiarán según el tiempo de la música.
</p>
            <button onClick={confirmarSincronizacion} className="modal-boton">
              Ok
            </button>
          </div>
        </div>
      )}

      <div className="carta-wrapper">
        <div className="carta-box">
          <h1 className="carta-titulo">{carta.titulo}</h1>
          <div className="carta-texto">{carta.texto}</div>

          {currentPage < 21 && !sincronizacionActiva && (
            <div className="flecha-container">
              <button onClick={goToNextPage} className="flecha-button">
                <span className="flecha-text">Continuar leyendo</span>
                <ChevronDown className="flecha-icon" />
              </button>
            </div>
          )}

          {sincronizacionActiva && (
            <div className="sincronizacion-activa">
              <Radio className="sincronizacion-icon" />
              <span>Sincronización activa</span>
            </div>
          )}
        </div>

        <div className="botones-container">
          <button onClick={togglePlay} className="boton boton-musica">
            {isPlaying ? (
              <>
                <Pause className="boton-icon" />
                Pausar Música
              </>
            ) : (
              <>
                <Play className="boton-icon" />
                Reproducir Música
              </>
            )}
          </button>

          <button onClick={goToOtraCarta} className="boton boton-carta">
            <ExternalLink className="boton-icon" />
            Ver canción original
          </button>
        </div>

        {/* Botón de sincronización */}
        <div className="sincronizacion-container">
          {!sincronizacionActiva ? (
            <button onClick={activarSincronizacion} className="boton-sincronizacion">
              <Radio className="boton-icon" />
              Activar Sincronización
            </button>
          ) : (
            <button onClick={desactivarSincronizacion} className="boton-sincronizacion activo">
              <Radio className="boton-icon" />
              Desactivar Sincronización
            </button>
          )}
        </div>

        {/* Mostrar duración del audio */}
        <div className="tiempo-container">
          <Clock className="tiempo-icon" />
          <span className="tiempo-texto">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="indicador-paginas">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((page) => (
            <button
              key={page}
              onClick={() => !sincronizacionActiva && setCurrentPage(page)}
              className={`indicador-punto ${currentPage === page ? 'activo' : ''}`}
              disabled={sincronizacionActiva}
            />
          ))}
        </div>
      </div>
    </div>
  );
}