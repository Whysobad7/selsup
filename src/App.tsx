import './App.css';
import React, { useEffect, useState } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: any[]; 
}

interface Props {
  params: Param[];
  model: Model;
  onModelChange: (model: Model, params: Param[]) => void; 
}

const ParamEditor: React.FC<Props> = ({ params, model, onModelChange }) => {
	const [editedParams, setEditedParams] = useState<Param[]>(params)
  	const [editedModel, setEditedModel] = useState<Model>(model);
	const [newParam, setNewParam] = useState<{ name: string, value: string }>({ name: '', value: '' });



	const handleParamChange = (paramId: number, value: string) => {
		const updatedModel = { ...editedModel };
		const index = updatedModel.paramValues.findIndex(pv => pv.paramId === paramId);
		if (index !== -1) {
		  updatedModel.paramValues[index].value = value;
		} else {
		  updatedModel.paramValues.push({ paramId, value });
		}
		setEditedModel(updatedModel);
	  };


  const handleAddNewParam = () => {
    if (newParam.name.trim() !== '' && newParam.value.trim() !== '') {
      const newParamId = Math.max(...editedParams.map(param => param.id)) + 1;
      const newParamObject: Param = {
        id: newParamId,
        name: newParam.name.trim(),
        type: 'string',
      };
      const updatedParams = [...editedParams, newParamObject];
      setEditedParams(updatedParams);

      const newParamValueEntry: ParamValue = {
        paramId: newParamId,
        value: newParam.value.trim(),
      };
      const updatedModel = { ...editedModel, paramValues: [...editedModel.paramValues, newParamValueEntry] };
      setEditedModel(updatedModel);

      setNewParam({ name: '', value: '' });
    }
  };


  return (
    <div className='App'>
      <h2>Param Editor</h2>
      {editedParams.map(param => (
        <div className='params' key={param.id}>
          <label>{param.name}</label>
          <input
            type="text"
            value={editedModel.paramValues.find(pv => pv.paramId === param.id)?.value || ''}
            onChange={e => handleParamChange(param.id, e.target.value)}
          />
        </div>
      ))}
 <div className='add-param'>
        <input
          type="text"
          placeholder="Название параметра"
          value={newParam.name}
          onChange={e => setNewParam({ ...newParam, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Значение параметра"
          value={newParam.value}
          onChange={e => setNewParam({ ...newParam, value: e.target.value })}
        />
        <button onClick={handleAddNewParam}>Добавить</button>
      </div>
	  <button className='btn' onClick={() => onModelChange(editedModel, editedParams)}>Сохранить</button>
    </div>
  );
};

const params: Param[] = [
	{
	  id: 1,
	  name: "Назначение",
	  type: 'string',
	},
	{
	  id: 2,
	  name: "Длина",
	  type: 'string',
	},
	{
	  id: 3,
	  name: "Цвет",
	  type: 'string',
	},
  ];
  
  const model: Model = {
	paramValues: [
	  {
		paramId: 1,
		value: "повседневное",
	  },
	  {
		paramId: 2,
		value: "макси",
	  },
	  {
		  paramId: 3,
		  value: "Белый",
		},
	],
	colors: [],
  };


const App: React.FC = () => {
	const handleModelChange = (editedModel: Model, editedParams: Param[]) => {
		console.log(editedModel);
		console.log(editedParams);
	  };

  return (
	<div className="container">
		<ParamEditor params={params} model={model} onModelChange={handleModelChange} />
	</div>
  );
};

export default App;
