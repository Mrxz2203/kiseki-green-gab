import React, { useState, useRef } from 'react';
import { Play, Pause, ExternalLink, ChevronDown } from 'lucide-react';
import './CartaMusical.css';

import Kiseki from '../assets/Kiseki.mp3';
import Shipp from '../assets/Shipp.jpg';

export default function CartaMusical() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToOtraCarta = () => {
    window.open('https://carta-amanecer.vercel.app/', '_blank');
  };

  const cartas = {
    1: {
      titulo: 'Kiseki by Gab',
      texto: `Te amaré! Aún más de lo que te amo hoy.
Son sentimientos que no se detendrán.
Ahora mismo! Estoy tan enamorado.
No sé como explicarte...
Los días que vivimos se unen
como nuestros caminos.
(Un Milagro)
¿Y si conocernos fue solo suerte?
¿o el destino?
Conocerte
(Es un milagro!)
Vivimos mientras sonreímos
así es nuestro amor.
Reiría por siempre a tu lado.
Gracias… y ah.
Te amo tanto.
Solo déjame decirte
que soy muy feliz.`
    },
    2: {
      titulo: 'Kiseki by Gab',
      texto: `Tenerte siempre aquí a mi lado
mientras me sostienes, deja a mi indefenso corazón
amarte aun más.
En mi día a día hay felicidad
mientras caminamos una travesía.
Encontrarnos pudo ser una coincidencia
pero en este mundo…
es un milagro!`
    },
    3: {
      titulo: 'Kiseki by Gab',
      texto: `
      Incluso en los días oscuros
solo luces vendrán.
La soledad y el dolor se marcharán.
Soy yo mismo
si tú estás.
Así que, quedate conmigo..
esto es para ti.
`
    },
4:{
  titulo: 'Kiseki by Gab',
      texto: `Aquellos días de camino a casa
se volvieron momentos eternos,
cuando abrí mi corazón
y vi por primera vez tu verdad.
Después de aceptarme
en este amor que nos llena.
Aún estamos a mitad del 
futuro que nos tocará compartir
o uno donde no estaré.`   },
     5: {
      titulo: 'Kiseki by Gab',
      texto: `Supongamos que..
si me pierdo
serías aquella luz que me guia`
    },
6: {
      titulo: 'Kiseki by Gab',
      texto: `Vivimos mientras sonreimos
así es nuestro amor.
Reiría por siempre a tu lado.
Gracias… y ah.
Te amo, tanto.
Solo déjame decirte
que soy muy feliz.
Aunque haya días difíciles
juntos los superaremos.
Compartamos nuestras risas y nuestas penas.
Soy yo mismo...
Si tú estás.
Así que, quedate conmigo..
Solo prome...teme.
Hasta mi último día.`
    },
    7: {
      titulo: 'Kiseki by Gab',
      texto: `¡Finalmente encontré mi razón de vivir!
Es porque estás junto a mí
que soy como soy.
Pasen años,
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

      <div className="carta-wrapper">
        <div className="carta-box">
          <h1 className="carta-titulo">{carta.titulo}</h1>
          <div className="carta-texto">{carta.texto}</div>

          {currentPage < 7 && (
            <div className="flecha-container">
              <button onClick={goToNextPage} className="flecha-button">
                <span className="flecha-text">Continuar leyendo</span>
                <ChevronDown className="flecha-icon" />
              </button>
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

        <div className="indicador-paginas">
          {[1, 2, 3, 4,5 ,6 , 7].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`indicador-punto ${
                currentPage === page ? 'activo' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
