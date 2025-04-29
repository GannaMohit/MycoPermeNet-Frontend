"use client"
import { InputText } from 'primereact/inputtext';  
import { useEffect, useState } from 'react';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { gql, useApolloClient, useLazyQuery, useQuery } from '@apollo/client';

export default function Home() {
  const [molSmile, setMolSmile] = useState("")
  const [mol, setMol] = useState()
  const [errorMol, setErrorMol] = useState(false)
  const [rdkit, setRDKit] = useState();

  const query = gql`query Query($molSmile: String!){ scores(molSmile:$molSmile) }`
  const [getScores, {loading, error, data}] = useLazyQuery(query) 

  useEffect(() => {
    window.initRDKitModule().then((RDKit: any) => {
      setRDKit(RDKit);
    });
  }, []);

  function handleInputSubmit(e) {
    e.preventDefault();
    const mol = rdkit.get_mol(molSmile)
    if (mol == null) {
      setErrorMol(true)
    }
    else {
      getScores({variables:{molSmile: molSmile}})
      setErrorMol(false)
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
              <InputText invalid={errorMol} id="molSmile" value={molSmile} onChange={e => setMolSmile(e.target.value)}/>
              <Button type='submit'>Submit</Button>
            </div>
            {errorMol && <Message severity="error" text="Invalid Molecule" />}
          </div>
        </form>
      </div>
      {loading && "Loading..." }
    </div>
    
  );
}
