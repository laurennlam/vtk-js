import test from 'tape-catch';

import vtkArrowSource from 'vtk.js/Sources/Filters/Sources/ArrowSource';
import vtkMath from 'vtk.js/Sources/Common/Core/Math';
import vtkOBBTree from 'vtk.js/Sources/Filters/General/OBBTree';

const PRECISION = 4;

test('Test OBB tree constructor', (t) => {
  const source = vtkArrowSource.newInstance();
  source.update();
  const mesh = source.getOutputData();

  const obbTree = vtkOBBTree.newInstance();
  obbTree.setDataset(mesh);
  obbTree.setMaxLevel(2);
  obbTree.buildLocator();

  const corner = [0, 0, 0];
  const max = [0, 0, 0];
  const mid = [0, 0, 0];
  const min = [0, 0, 0];
  const size = [0, 0, 0];
  const computedValues = [corner, max, mid, min, size];
  const expectedValues = [
    { name: 'corner', value: [-0.325, -0.1, -0.0866025] },
    { name: 'max', value: [1, -2.23691e-18, 1.98581e-19] },
    { name: 'mid', value: [4.47383e-19, 0.2, -4.16085e-11] },
    { name: 'min', value: [-3.43953e-20, 3.6034e-11, 0.173205] },
    { name: 'size', value: [0.0658262, 0.00126738, 0.00126738] },
  ];

  obbTree.computeOBBFromDataset(mesh, corner, max, mid, min, size);

  computedValues.forEach((value, index) => {
    const expected = expectedValues[index];
    t.deepEqual(
      vtkMath.roundVector(value, [], PRECISION),
      vtkMath.roundVector(expected.value, [], PRECISION),
      expected.name
    );
  });

  t.end();
});
