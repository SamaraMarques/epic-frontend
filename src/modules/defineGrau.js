export default function defineGrau(grau) {
  switch (true) {
    case grau === 1:
      return 'baixo';

    case grau === 2:
      return 'médio';

    case grau === 3:
      return 'alto';

    default:
      return '';
  }
}
