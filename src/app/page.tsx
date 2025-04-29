"use client"
import { InputText } from 'primereact/inputtext';  
import { useEffect, useState } from 'react';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { gql, useApolloClient, useLazyQuery, useQuery } from '@apollo/client';
import {SingleView, Molecule} from '../lib/xsmiles/modules/SingleView';
import { Method } from '@/lib/xsmiles/types/molecule.types';
import { GradientConfig } from '@/lib/xsmiles/types/gradient.types';

export default function Home() {
  const [molSmile, setMolSmile] = useState("")
  const [mol, setMol] = useState<Molecule>()
  const [errorMol, setErrorMol] = useState(false)
  const [rdkit, setRDKit] = useState();

  const query = gql`query Query($molSmile: String!){ scores(molSmile:$molSmile) }`
  const [getScores, {loading, error, data}] = useLazyQuery(query) 

  const grad: GradientConfig = {
    thresholds: [],
    colorDomain: [],
    palette: {name: "blue", colors: ['blue', 'green', 'purple', 'cyan']},
    highlight: true,
    blur: 0.8,
    opacity: { min: 0.6, max: 1 },
    radius: { min: 32, max: 64 }, // the function getGradientConfig adjusts
    delta: 0.005,
  }

  const met: Method = {
    name: "model 1",
    scores: data == undefined ? undefined: data.scores,
    attributes: {"name": "217745"}
  }
  const molecule: Molecule = {
    string: molSmile,
    method: met,
    attributes: {"model 1": "0.5656"}
  }

  useEffect(() => {
    window.initRDKitModule().then((RDKit: any) => {
      window.RDKit = RDKit
      setRDKit(RDKit);
    });
  }, []);

  function handleInputSubmit(e) {
    e.preventDefault();
    const rdkitMol = rdkit.get_mol(molSmile)
    if (rdkitMol == null) {
      setErrorMol(true)
    }
    else {
      getScores({variables:{molSmile: molSmile}}).then((dataScores) => {
        setMol(molecule)
        setErrorMol(false)
      }).catch(() => {
        setErrorMol(true)
      })
    }
  }
  return (
    <div>
      <h1>MycoPermeNet</h1>
      <div className="card flex justify-content">
        <form onSubmit={handleInputSubmit}>
          <div className="flex flex-column gap-2">
            <label htmlFor="molSmile">Molecule SMILES</label>
            <div className='flex flex-row gap-2'>
              <InputText invalid={errorMol} id="molSmile" name='molSmile' value={molSmile} onChange={e => setMolSmile(e.target.value)}/>
              <Button type='submit'>Submit</Button>
            </div>
            {errorMol && <Message severity="error" text="Invalid Molecule" />}
          </div>
        </form>
      </div>
      {loading && "Loading..." }
      {data && <SingleView
        molecule={molecule}
        drawerType='RDKitDrawer'
        gradientConfig={grad}
      />}
    </div>
    
  );
}
