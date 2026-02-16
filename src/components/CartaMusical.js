import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ExternalLink, ChevronDown, Clock, Radio } from 'lucide-react';
import './CartaMusical.css';

import Kiseki from '../assets/Kiseki.mp3';
import Shipp from '../assets/Shipp.jpg';

// Definir los rangos de tiempo para cada página (en segundos)
const tiemposPaginas = {
  1: { inicio: 0, fin: 41 },
  2: { inicio: 42, fin: 63 },
  3: { inicio: 64, fin: 84 },
  4: { inicio: 85, fin: 105 },
  5: { inicio: 106, fin: 128 },
  6: { inicio: 129, fin: 147 },
  7: { inicio: 148, fin: 181 },
  8: { inicio: 182, fin: 191 },
  9: { inicio: 192, fin: 212 },
  10: { inicio: 213, fin: 246 },
  11: { inicio: 247, fin: 258 },
  12: { inicio: 259, fin: 271 }
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
    for (let pagina = 1; pagina <= 12; pagina++) {
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
    if (currentPage < 12) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToOtraCarta = () => {
    window.open('https://carta-amanecer.vercel.app/', '_blank');
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
      texto: `Te amaré! Aún más de lo que te amo hoy.
Son sentimientos que no se detendrán.
¡Ahora mismo! Estoy tan enamorado.
No sé como explicarte...`
    },
    2: {
      titulo: 'Kiseki by Gab',
      texto: `Los días que vivimos se unen
como nuestros caminos.
(¡Es un Milagro!)
¿Y si conocernos fue solo suerte?
¿o el destino?
El conocerte
(Es un milagro!)`
    },
    3: {
      titulo: 'Kiseki by Gab',
      texto: `Vivimos mientras sonreímos
así es nuestro amor.
Reiría por siempre a tu lado.
Gracias… y ah...
Te amo, tanto.
Solo déjame decirte
que soy tan feliz.`
    },
    4: {
      titulo: 'Kiseki by Gab',
      texto: `Tenerte por siempre aquí a mi lado
mientras solo me sostienes, 
me deja tan indefenso 
y tan enamorado.`
    },
    5: {
      titulo: 'Kiseki by Gab',
      texto: `En mi día a día hay felicidad
mientras caminamos una (¡travesía!).
Encontrarnos pudo ser una coincidencia
pero en este mundo…
es un milagro!`
    },
    6: {
      titulo: 'Kiseki by Gab',
      texto: `Incluso en los días oscuros
solo luces vendrán.
La soledad y el dolor se marcharán.
Soy yo mismo
si tú estás.
Así que, quedate conmigo..
esto es para ti.`
    },
    7: {
      titulo: 'Kiseki by Gab',
      texto: `Aquellos días de camino a casa
se volvieron momentos eternos,
fue cuando abrí mi corazón
y vi por primera vez tu verdad.
Después de aceptarme
en este amor que nos llena.
Aún estamos a mitad del 
futuro que nos tocará recorrer
o uno donde no estaré...`
    },
    8: {
      titulo: 'Kiseki by Gab',
      texto: `Supongamos que..
si me perdiera...
en la oscuridad...
serias tu mi luz.`
    },
    9: {
      titulo: 'Kiseki by Gab',
      texto: `Vivimos mientras sonreimos
así es nuestro amor.
Reiría por siempre si estás tú.
Gracias… y ah.
Te amo, tanto.
Solo déjame decirte
que soy tan feliz.`
    },
    10: {
      titulo: 'Kiseki by Gab',
      texto: `Aunque haya días difíciles
juntos los superaremos.
Compartamos nuestras penas y nuestras risas.
Soy yo mismo...
Si tú estás.
Así que, solo te pido.
Que te quedes...
Hasta mi último día.`
    },
    11: {
      titulo: 'Kiseki by Gab',
      texto: `¡Finalmente entendí mi razón de vivir!
Es porque estás junto a mí
que aprendí a vivir.`
    },
    12: {
      titulo: 'Kiseki by Gab',
      texto: `Pasen los años,
o el tiempo que me toque vivir,
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

          {currentPage < 12 && !sincronizacionActiva && (
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
            Ver Otra Carta
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((page) => (
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