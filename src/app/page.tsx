"use client"
import { InputText } from 'primereact/inputtext';  
import { useState } from 'react';

export default function Home() {
  const [molSmile, setMolSmile] = useState("")
  return (
    <div>
      <InputText value={molSmile} onChange={(e) => setMolSmile(e.target.value)}></InputText>
    </div>
    
  );
}
