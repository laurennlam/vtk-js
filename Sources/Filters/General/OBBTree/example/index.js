import 'vtk.js/Sources/favicon';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';

import vtkOBBTree from 'vtk.js/Sources/Filters/General/OBBTree';
import vtkArrowSource from 'vtk.js/Sources/Filters/Sources/ArrowSource';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [0, 0, 0],
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

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

obbTree.computeOBBFromDataset(mesh, corner, max, mid, min, size);

const obb = obbTree.generateRepresentation(0);

// ----------------------------------------------------------------------------
// Setup actors
// ----------------------------------------------------------------------------

const mapperArrow = vtkMapper.newInstance();
mapperArrow.setInputData(mesh);
const actorArrow = vtkActor.newInstance();
actorArrow.setMapper(mapperArrow);
renderer.addActor(actorArrow);

const mapper = vtkMapper.newInstance();
mapper.setInputData(obb);
const actor = vtkActor.newInstance();
actor.setMapper(mapper);
actor.getProperty().setOpacity(0.5);
actor.getProperty().setEdgeVisibility(1);

renderer.addActor(actor);

renderer.resetCamera();
renderer.resetCameraClippingRange();
renderWindow.render();
