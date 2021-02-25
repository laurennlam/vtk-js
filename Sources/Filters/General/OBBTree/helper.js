import { CellType } from 'vtk.js/Sources/Common/DataModel/CellTypes/Constants';

/**
 * Get the correct point ID from a cell id
 * @param {Array} cellPtsIds
 * @param {CellType} type
 * @param {Number} idx
 * @returns {Object} Contains three point's id of cells as 'ptId0', 'ptId1', 'ptId2'
 */
export function getCellTriangles(cellPtsIds, type, idx) {
  let ptId0 = -1;
  let ptId1 = -1;
  let ptId2 = -1;

  const cellListLength = cellPtsIds.length;

  switch (type) {
    case CellType.VTK_TRIANGLE:
    case CellType.VTK_POLYGON:
    case CellType.VTK_QUAD: {
      if (idx > cellListLength) break;
      ptId0 = cellPtsIds[0];
      ptId1 = cellPtsIds[idx + 1];
      ptId2 = cellPtsIds[idx + 2];
      break;
    }
    case CellType.VTK_TRIANGLE_STRIP: {
      // eslint-disable-next-line no-bitwise
      const idx1 = idx + 1 + (idx & 1);
      // eslint-disable-next-line no-bitwise
      const idx2 = idx + 2 - (idx & 1);

      if (idx1 > cellListLength || idx2 > cellListLength) break;

      ptId0 = cellPtsIds[idx];
      ptId1 = cellPtsIds[idx1];
      ptId2 = cellPtsIds[idx2];
      break;
    }
    default:
      ptId0 = -1;
      ptId1 = -1;
      ptId2 = -1;
      break;
  }

  return { ptId0, ptId1, ptId2 };
}

/**
 * Method to concaten two Float32 array into a new one
 * @param {Float32Array} first
 * @param {Float32Array} second
 * @return {Float32Array}
 */
export function Float32Concat(first, second) {
  const firstLength = first.length;
  const result = new Float32Array(firstLength + second.length);

  result.set(first);
  result.set(second, firstLength);

  return result;
}
