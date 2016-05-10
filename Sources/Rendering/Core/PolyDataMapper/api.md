vtkPolyDataMapper is a class that maps polygonal data (i.e., vtkPolyData)
to graphics primitives. vtkPolyDataMapper serves as a superclass for
device-specific poly data mappers, that actually do the mapping to the
rendering/graphics hardware/software.

## render(renderer, actor)

This calls RenderPiece (in a for loop if streaming is necessary).

## setInputData(polydata)

Specify the input data to map.

## getInputData()

Return the input polydata to be mapped.

## update()

Bring this algorithm's outputs up-to-date.

## setPiece(p), getPiece(), setNumberOfPieces(n), getNumberOfPieces(), setNumberOfSubPieces(n), getNumberOfSubPieces()

If you want only a part of the data, specify by setting the piece.

  vtkSetMacro(Piece, int);
  vtkGetMacro(Piece, int);
  vtkSetMacro(NumberOfPieces, int);
  vtkGetMacro(NumberOfPieces, int);
  vtkSetMacro(NumberOfSubPieces, int);
  vtkGetMacro(NumberOfSubPieces, int);

## ghostLevel

Set/get the number of ghost cells to return.

  vtkSetMacro(GhostLevel, int);
  vtkGetMacro(GhostLevel, int);

  // Description:
  // Return bounding box (array of six doubles) of data expressed as
  // (xmin,xmax, ymin,ymax, zmin,zmax).
  virtual double *GetBounds();
  virtual void GetBounds(double bounds[6])
    { this->Superclass::GetBounds(bounds); }

  // Description:
  // Make a shallow copy of this mapper.
  void ShallowCopy(vtkAbstractMapper *m);

  // Description:
  // Select a data array from the point/cell data
  // and map it to a generic vertex attribute.
  // vertexAttributeName is the name of the vertex attribute.
  // dataArrayName is the name of the data array.
  // fieldAssociation indicates when the data array is a point data array or
  // cell data array (vtkDataObject::FIELD_ASSOCIATION_POINTS or
  // (vtkDataObject::FIELD_ASSOCIATION_CELLS).
  // componentno indicates which component from the data array must be passed as
  // the attribute. If -1, then all components are passed.
  virtual void MapDataArrayToVertexAttribute(
    const char* vertexAttributeName,
    const char* dataArrayName, int fieldAssociation, int componentno = -1);

  virtual void MapDataArrayToMultiTextureAttribute(
    int unit,
    const char* dataArrayName, int fieldAssociation, int componentno = -1);

  // Description:
  // Remove a vertex attribute mapping.
  virtual void RemoveVertexAttributeMapping(const char* vertexAttributeName);

  // Description:
  // Remove all vertex attributes.
  virtual void RemoveAllVertexAttributeMappings();

  // Description:
  // see vtkAlgorithm for details
  virtual int ProcessRequest(vtkInformation*,
                             vtkInformationVector**,
                             vtkInformationVector*);

protected:
  vtkPolyDataMapper();
  ~vtkPolyDataMapper() {}

  // Description:
  // Called in GetBounds(). When this method is called, the consider the input
  // to be updated depending on whether this->Static is set or not. This method
  // simply obtains the bounds from the data-object and returns it.
  virtual void ComputeBounds();

  int Piece;
  int NumberOfPieces;
  int NumberOfSubPieces;
  int GhostLevel;

  virtual int FillInputPortInformation(int, vtkInformation*);

private:
  vtkPolyDataMapper(const vtkPolyDataMapper&);  // Not implemented.
  void operator=(const vtkPolyDataMapper&);  // Not implemented.
};

#endif
