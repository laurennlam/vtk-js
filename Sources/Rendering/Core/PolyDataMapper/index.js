
  virtual void Render(vtkRenderer *ren, vtkActor *act);
  void SetInputData(vtkPolyData *in);
  vtkPolyData *GetInput();

  virtual void Update(int port);
  virtual void Update();
  virtual int Update(int port, vtkInformationVector* requests);
  virtual int Update(vtkInformation* requests);

