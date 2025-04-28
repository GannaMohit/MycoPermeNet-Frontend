"use client"
import { InputText } from 'primereact/inputtext';  
import { useEffect, useState } from 'react';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';

export default function Home() {
  const [molSmile, setMolSmile] = useState("")
  const [mol, setMol] = useState()
  const [errorMol, setErrorMol] = useState(false)
  const [rdkit, setRDKit] = useState();


  useEffect(() => {
    window.initRDKitModule().then((RDKit: any) => {
      setRDKit(RDKit);
    });
  }, []);

  function handleInputSubmit(e) {
    const mol = rdkit.get_mol(molSmile)
    
    if (!mol) {
      setErrorMol(true)
      // alert("Invalid Molecule")
    }
    
  }
  return (
    <div>
      <h1>MycoPermeNet</h1>
      <div className="card flex justify-content">
        <form action={handleInputSubmit}>
          <div className="flex flex-column gap-2">
            <label htmlFor="molSmile">Molecule SMILES</label>
            <div className='flex flex-row gap-2'>
              <InputText id="molSmile" value={molSmile} onChange={e => setMolSmile(e.target.value)}/>
              <Button type='submit'>Submit</Button>
            </div>
            {errorMol && <Message severity="error" text="Invalid Molecule" />}
          </div>
        </form>
      </div>
    </div>
    
  );
}
