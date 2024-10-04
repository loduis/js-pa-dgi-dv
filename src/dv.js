const NATURAL = 1
const LEGAL = 2

const N = '5'

const LETTERS = {
  E: { code: '5', validate: '66' },
  PE: { code: '75', validate: '82' },
  N: { code: '4', validate: '92' },
  AV: { code: '15', validate: '9595' },
  PI: { code: '79', validate: '9595' }
}

const OLD_RUC_CROSS_REF = {
  '00': '00',
  10: '01',
  11: '02',
  12: '03',
  13: '04',
  14: '05',
  15: '06',
  16: '07',
  17: '08',
  18: '09',
  19: '01',
  20: '02',
  21: '03',
  22: '04',
  23: '07',
  24: '08',
  25: '09',
  26: '02',
  27: '03',
  28: '04',
  29: '05',
  30: '06',
  31: '07',
  32: '08',
  33: '09',
  34: '01',
  35: '02',
  36: '03',
  37: '04',
  38: '05',
  39: '06',
  40: '07',
  41: '08',
  42: '09',
  43: '01',
  44: '02',
  45: '03',
  46: '04',
  47: '05',
  48: '06',
  49: '07'
}

const zFill = (number, max, start = true) =>
  number.toString()[start ? 'padStart' : 'padEnd'](max, '0')

const calculate = (sw, ructb) => {
  let j = 2
  let sum = 0

  for (let i = ructb.length - 1; i >= 0; i--) {
    if (sw && j === 12) {
      sw = false
      j--
    }
    sum += j * +ructb[i]
    j++
  }

  const r = sum % 11
  return r > 1 ? 11 - r : 0
}

class DV {
  #type
  #len
  #isOld
  #ruc
  constructor (ruc, type) {
    this.#type = +type
    this.#ruc = ruc.toUpperCase().split('-')
    this.#len = this.#ruc.length
    this.#isOld = false
  }

  static natural (ruc) {
    return new this(ruc, NATURAL).get()
  }

  static legal (ruc) {
    return new this(ruc, LEGAL).get()
  }

  static get (ruc, type) {
    return new this(ruc, type).get()
  }

  get #isNatural () {
    return this.#type === NATURAL
  }

  get #isLegal () {
    return this.#type !== NATURAL
  }

  get #rucTable () {
    if (this.#len < 3) return null
    if (this.#len === 4) {
      const [province, key, imageFolio, seatToken] = this.#ruc
      return key === 'NT' ? this.#rtNt(province, imageFolio, seatToken) : null
    }

    const [letter, imageFolio, seatToken] = this.#ruc

    if (['AV', 'PI'].some((lt) => letter.endsWith(lt))) {
      return this.#rtAvPi(letter, imageFolio, seatToken)
    }

    if (['N', 'E', 'PE'].includes(letter)) {
      return this.#rtNePe(letter, imageFolio, seatToken)
    }

    if (isNaN(letter)) return null

    return this.#isNatural
      ? this.#rtEmptyLetterNatural(letter, imageFolio, seatToken)
      : this.#rtEmptyLetterLegal(letter, imageFolio, seatToken)
  }

  #rtEmptyLetterNatural (province, imageFolio, seatToken) {
    if (
      isNaN(province) ||
      isNaN(imageFolio) ||
      isNaN(seatToken) ||
      province.length > 2 ||
      imageFolio.length > 4 ||
      seatToken.length > 9
    ) {
      return null
    }
    return zFill(
      N +
          zFill(province, 2) +
          '00' +
          zFill(imageFolio, 3) +
          zFill(seatToken.slice(0, 5), 5),
      20
    )
  }

  #rtEmptyLetterLegal (rollTome, imageFolio, seatToken) {
    if (
      isNaN(rollTome) ||
      isNaN(imageFolio) ||
      isNaN(seatToken) ||
      rollTome.length > 9 ||
      imageFolio.length > 4 ||
      seatToken.length > 6
    ) {
      return null
    }

    let ructb =
      zFill(rollTome, 10) + zFill(imageFolio, 4) + zFill(seatToken, 6)
    if (ructb[3] === '0' && ructb[4] === '0' && +ructb[5] < 5) {
      this.#isOld = true
      ructb =
        ructb.slice(0, 5) +
        (OLD_RUC_CROSS_REF[ructb.slice(5, 7)] || ructb.slice(5, 7)) +
        ructb.slice(7)
    }
    return ructb
  }

  #rtNt (province, imageFolio, seatToken) {
    if (
      isNaN(province) ||
      isNaN(imageFolio) ||
      isNaN(seatToken) ||
      province.length > 2 ||
      imageFolio.length > 3 ||
      (this.#isNatural && seatToken.length > 6) ||
      (this.#isLegal && seatToken.length > 7)
    ) {
      return null
    }
    let len = seatToken.length
    const isSix = len === 6
    len = isSix ? 6 : 5
    return (
      zFill(this.#isNatural ? N : '0', isSix ? 7 : 8) +
      zFill(province, 2) +
      '43' +
      zFill(imageFolio, 3) +
      zFill(seatToken.slice(0, len), len)
    )
  }

  #rtAvPi (letter, imageFolio, seatToken) {
    const province = letter.slice(0, -2)
    if (
      isNaN(province) ||
      isNaN(imageFolio) ||
      isNaN(seatToken) ||
      province.length > 2 ||
      imageFolio.length > 4 ||
      seatToken.length > 8
    ) {
      return null
    }
    letter = letter.slice(-2)
    const info = LETTERS[letter]
    let ructb = N
    if (imageFolio.length < 4) {
      ructb += zFill(province, 2) + info.code + zFill(imageFolio, 3)
    } else {
      ructb += info.validate + zFill(imageFolio, 4)
    }
    ructb += zFill(seatToken.slice(0, 5), 5)
    return zFill(ructb, 20)
  }

  #rtNePe (letter, imageFolio, seatToken) {
    if (
      isNaN(imageFolio) ||
      isNaN(seatToken) ||
      imageFolio.length > 4 ||
      seatToken.length > 9
    ) {
      return null
    }
    let len = 5
    const info = LETTERS[letter]
    if (seatToken.length === 6 && ['E', 'N'].includes(letter)) {
      len++
    }
    const isSix = len === 6
    let ructb = N
    if (imageFolio.length < 4) {
      ructb +=
        '00' +
        zFill(info.code, 2, false) +
        zFill(imageFolio, 3) +
        zFill(seatToken.slice(0, len), len)
    } else {
      ructb +=
        info.validate +
        (isSix ? zFill(info.code, 2, false) : info.code) +
        zFill(imageFolio, 4) +
        zFill(seatToken.slice(0, len), len)
    }
    return zFill(ructb, 20)
  }

  get () {
    const ructb = this.#rucTable
    if (!ructb) return null
    const dv1 = calculate(this.#isOld, ructb)
    const dv2 = calculate(this.#isOld, ructb + dv1)

    return dv1 * 10 + dv2
  }
}

export default DV
