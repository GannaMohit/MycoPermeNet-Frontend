"use client"
import { InputText } from 'primereact/inputtext';  
import { useState } from 'react';

export default function Home() {
  const [molSmile, setMolSmile] = useState("")
  return (
    <div>
      <h1>MycoPermeNet</h1>
      <div className="card flex justify-content">
        <div className="flex flex-column gap-2">
          <label htmlFor="molSmile">Molecule SMILES</label>
          <InputText id="molSmile" value={molSmile} onChange={(e) => setMolSmile(e.target.value)} />
        </div>
      </div>
    </div>
    
  );
}
