import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ExternalLink, ChevronDown, Clock, Radio } from 'lucide-react';
import './CartaMusical.css';

import Kiseki from '../assets/Kiseki.mp3';
import Shipp from '../assets/logo.png';

// Definir los rangos de tiempo para cada página (en segundos)
const tiemposPaginas = {
  1: { inicio: 0, fin: 20 },
  2: { inicio: 21, fin: 41 },
  3: { inicio: 42, fin: 52 },
  4: { inicio: 53, fin: 63 },
  5: { inicio: 64, fin: 73 },
  6: { inicio: 74, fin: 84 },
  7: { inicio: 85, fin: 105 },
  8: { inicio: 106, fin: 128 },
  9: { inicio: 129, fin: 137 },
  10: { inicio: 138, fin: 147 },
  11: { inicio: 148, fin: 157 },
  12: { inicio: 158, fin: 163 },
  13: { inicio: 164, fin: 172 },
  14: { inicio: 173, fin: 181 },
  15: { inicio: 182, fin: 190 },
  16: { inicio: 191, fin: 200 },
  17: { inicio: 201, fin: 212 },
  18: { inicio: 213, fin: 222 },
  19: { inicio: 223, fin: 235 },
  20: { inicio: 236, fin: 242 },
  21: { inicio: 243, fin: 247 },
  22: { inicio: 248, fin: 258 },
  23: { inicio: 259, fin: 271 },
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

     const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(audio.duration);
    setCurrentPage(23);
  };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
audio.addEventListener('timeupdate', handleTimeUpdate);
audio.addEventListener('ended', handleEnded);

return () => {
  audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
  audio.removeEventListener('timeupdate', handleTimeUpdate);
  audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Sincronización automática con la música
  useEffect(() => {
    if (!sincronizacionActiva) return;

    // Encontrar la página correspondiente al tiempo actual
    for (let pagina = 1; pagina <= 23; pagina++) {
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

 const togglePlay = async () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('No se pudo reproducir el audio:', error);
    }
  }
};

  const goToNextPage = () => {
    if (currentPage < 23) {
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

  const confirmarSincronizacion = async () => {
  setSincronizacionActiva(true);
  setMostrarModal(false);

  // Reproducir automáticamente si no está reproduciendo
  if (!isPlaying && audioRef.current) {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('No se pudo reproducir el audio:', error);
      setIsPlaying(false);
    }
  }
};

  const desactivarSincronizacion = () => {
    setSincronizacionActiva(false);
  };

  const cartas = {
1: {
     titulo: 'Kiseki - Milagro',
      texto: `Adaptacion personal de la cancion Kiseki de Green.`
    }, 
    2: {
     titulo: 'Kiseki - Milagro',
      texto: `¡Te amaré! Aún más de lo que te amo.
Son sentimientos que no se detendrán.
¡Ahora mismo! Estoy tan enamorado.
No sé como explicarte...`
    }, 
    3: {
      titulo: 'Kiseki - Milagro',
      texto: `Los días que vivimos se unen,
mientras solo sentimos
nuestro milagro!`
    },
     4: {
      titulo: 'Kiseki - Milagro',
      texto: `¿Y si conocernos fue solo suerte?
¿O es el destino?
¡El conocerte
es un milagro!`
    },
    5: {
      titulo: 'Kiseki - Milagro',
      texto: `Sonreímos mientras vivimos
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
      texto: `Estar aqui por siempre a tu lado
mientras sostienes a mi indefenso
corazón tan suavemente,
me vuelve loco por ti.`
    },
    8: {
      titulo: 'Kiseki - Milagro',
      texto: `En el día a día nacen alegrías,
mientras recorremos nuestro milagro!
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
Sí tú, estás.
Así que, solo escuchame,
esto es para...`
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
en este amor que nos llena.`
    },
      13: {
      titulo: 'Kiseki - Milagro',
      texto: `Sola caminarás hacia el 
futuro que te tocará vivir,
uno donde no estaré...`
    },
    14: {
      titulo: 'Kiseki - Milagro',
      texto: `...`
    },
    15: {
      titulo: 'Kiseki - Milagro',
      texto: `Supongamos que...
si me perdiera...
en la oscuridad...
serias tu mi...`
    },
    16: {
      titulo: 'Kiseki - Milagro',
      texto: `Sonreímos mientras vivimos
así es nuestra historia.
Reiría por siempre si estás aquí.`
    },
    17: {
      titulo: 'Kiseki - Milagro',
      texto: `Gracias… y ahh...
Te amo, tanto.
Solo déjame decirte,
que fui tan feliz.`
    },
    18: {
      titulo: 'Kiseki - Milagro',
      texto: `Aunque hubo días difíciles
juntos los superamos.
Compartiamos nuestras penas y nuestras risas.`
    },
    19: {
      titulo: 'Kiseki - Milagro',
      texto: `Soy yo mismo.
Sí tú, estás.
Así que, solo te pido,
que te quedes...`
    },
    20: {
      titulo: 'Kiseki - Milagro',
      texto: `Hasta mi último día...` 
    },
     21: {
      titulo: 'Kiseki - Milagro',
      texto: `...` 
    },
    22: {
      titulo: 'Kiseki - Milagro',
      texto: `¡Finalmente entendí mi razón de ser!
Es porque estás junto a mí
que aprendí a vivir.`
    },
    23: {
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
      <audio ref={audioRef} src={Kiseki} />

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
          <div
  className={`carta-texto ${
    currentPage === 14 || currentPage === 21
      ? 'pausa-emocional'
      : ''
  }`}
>
  {carta.texto}
</div>

          {currentPage < 23 && !sincronizacionActiva && (
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((page) => (
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