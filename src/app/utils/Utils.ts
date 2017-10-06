export class Utils {

  static randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static randomString(length, allowSpaces, allowReturns) {
    let text = '';
    let possible = 'abcdefghijklmnopqrstuvwxyz';

    if (allowSpaces) {
      possible += '   ';
    }
    if (allowReturns) {
      possible += '\n';
    }

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
