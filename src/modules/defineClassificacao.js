export default function defineClassificacao(indiceNCFinal) {
  switch (true) {
    case indiceNCFinal <= 0.2:
      return 'muito baixo';

    case indiceNCFinal <= 0.4:
      return 'baixo';

    case indiceNCFinal <= 0.6:
      return 'moderado';

    case indiceNCFinal <= 0.8:
      return 'alto';

    case indiceNCFinal < 1:
      return 'muito alto';

    default:
      return '';
  }
}
