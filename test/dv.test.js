import { expect } from 'chai'
import DV
  from '../src/dv.js'

describe('DV Class Tests', function () {
  it('should pass general DV.get() tests', function () {
    const testCases = [
      ['8-802-1966', 73, 1],
      ['8-NT-2-8502', 57, 2],
      ['13-NT-2-744390', 64, 1],
      ['8-782-1159', 36, 1],
      ['8-720-763', 6, 1],
      ['3-716-748', 3, 1],
      ['6-713-2143', 93, 1],
      ['9-150-8', 4, 1],
      ['1641462-1-673798', 48, 2],
      ['3-78-447', 42, 1],
      ['1902725-1-722936', 73, 2],
      ['1797978-1-704870', 76, 2],
      ['8-NT-2-714823', 17, 1],
      ['155658601-2-2017', 33, 2],
      ['8-521-1350', 95, 1],
      ['8-788-557', 94, 1],
      ['8-755-1717', 90, 1],
      ['8-NT-2-757773', 62, 1],
      ['8-821-822', 53, 1],
      ['4-137-2049', 27, 1],
      ['8-946-1792', 4, 1],
      ['8-68-1774', 90, 1],
      ['1554-264-31258', 18, 2],
      ['3-702-470', 5, 1],
      ['8-873-110', 83, 1],
      ['25049890-3-2022', 54, 2],
      ['8-229-316', 71, 1],
      ['8-725-1124', 54, 1]
    ]

    testCases.forEach(([ruc, dv, type]) => {
      expect(DV.getDV(ruc, type)).to.equal(dv)
    })
  })

  it('should pass DV.natural() tests for PE', function () {
    const testCases = [
      ['PE-0-0', 14],
      ['PE-1-19', 60],
      ['PE-123-12345', 42],
      ['PE-842-3681', 51],
      ['PE-712-5789', 82],
      ['PE-523-8262', 37],
      ['PE-5-637', 70]
    ]

    testCases.forEach(([ruc, dv]) => {
      expect(DV.natural(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.natural() tests for E', function () {
    const testCases = [
      ['E-0-0', 75],
      ['E-8-127702', 16],
      ['E-8-127703', 5],
      ['E-8-12770', 72],
      ['E-1234-12770', 98],
      ['E-1235-12770', 23],
      ['E-1-11', 63],
      ['E-7824-53189', 90],
      ['E-9624-41065', 80],
      ['E-6521-53249', 99],
      ['E-5056-27219', 16],
      ['E-123-1277012', 65],
      ['E-8-96407', 29],
      ['E-1234-123456789', 26]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.natural(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.natural() tests for AV', function () {
    const testCases = [
      ['0AV-0-0', 10],
      ['8AV-1-196', 90],
      ['2AV-1234-12345', 26],
      ['2AV-1234-123', 33],
      ['2AV-123-123456', 28],
      ['8AV-123-123456', 78],
      ['2AV-1234-1234', 2]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.natural(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.natural() tests for N', function () {
    const testCases = [
      ['N-0-0', 76],
      ['N-19-1821', 11],
      ['N-1-24', 89],
      ['N-1234-12345', 0],
      ['N-7824-53189', 73],
      ['N-9624-41065', 63],
      ['N-6521-53249', 72]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.natural(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.natural() tests for PI', function () {
    const testCases = [
      ['0PI-0-0', 57],
      ['13PI-1-196', 58],
      ['8PI-1-80', 5],
      ['8PI-23-65', 91],
      ['2PI-23-65', 41],
      ['2PI-123-1234', 41],
      ['2PI-1234-12345', 26],
      ['2PI-1234-123', 33],
      ['2PI-123-123456', 65],
      ['2PI-1234-1234', 2],
      ['8PI-1234-1234', 2],
      ['8PI-1234-12345', 26]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.natural(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.natural() tests for empty Letter', function () {
    const testCases = [
      ['0-0-0', 70],
      ['8-769-1080', 56],
      ['5-257-218', 9],
      ['6-108-289', 79],
      ['8-28-1284', 33],
      ['2-7-89', 20],
      ['2-1234-123456789', 1]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.natural(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.natural() tests for NT', function () {
    const testCases = [
      ['0-NT-0-0', 9],
      ['8-NT-1-24', 33],
      ['3-NT-465-45624', 3],
      ['9-NT-2-421578', 50],
      ['6-NT-227-888555', 9],
      ['12-NT-45-2154', 17]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.natural(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.legal() tests for NT', function () {
    const testCases = [
      ['0-NT-0-0', 31],
      ['8-NT-1-13656', 43],
      ['1-NT-45-56544', 3],
      ['5-NT-478-2351', 94],
      ['7-NT-102-33575', 3],
      ['11-NT-958-2182101', 82],
      ['8-NT-1-1234567', 49],
      ['11-NT-958-218210', 73],
      ['11-NT-958-2182104', 82],
      ['8-NT-1-123456', 52]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.legal(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.legal() tests for legal', function () {
    const testCases = [
      ['155720753-2-2022', 39],
      ['2588017-1-831938', 20],
      ['1489806-1-645353', 68],
      ['1956569-1-732877', 0],
      ['797609-1-493865', 12],
      ['15565624-2-2017', 63]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.legal(ruc)).to.equal(dv)
    })
  })

  it('should pass DV.legal() tests for legal old', function () {
    const testCases = [
      ['10102-64-103462', 30],
      ['1102-85-117211', 95],
      ['41425-516-58123', 41],
      ['32425-254-85621', 68],
      ['12388-184-921', 62]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.legal(ruc)).to.equal(dv)
    })
  })
  /*
  it('should pass DV.legal() tests for property', function () {
    const testCases = [
      ['88358-8715', 30]
    ]
    testCases.forEach(([ruc, dv]) => {
      expect(DV.legal(ruc)).to.equal(dv)
    })
  })
*/
})
