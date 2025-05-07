"use client"
import { Slider } from 'primereact/slider';
import {moleculeDescriptorsInfo, descriptor} from './consts'
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';

export default function Molecule() {
    const [descriptorInputs, setDescriptorInputs] = useState(moleculeDescriptorsInfo)


    const handleInputChange = (index: number, val) => {
        const newdescriptorInputs = [...descriptorInputs];
        newdescriptorInputs[index].value = val;
        setDescriptorInputs(newdescriptorInputs);
      };

    return (
        <div className="flex flex-column gap-2 w-10 m-1">
            <h1>Molecule MycoPermeNet</h1>
            <form>
            {descriptorInputs.map((desc, idx) => (
                <div className="flex flex-column gap-2 w-6 m-2" key={desc.descriptor+'div'}>
                    <label htmlFor={desc.descriptor} key={desc.descriptor+'label'}>{desc.descriptor}</label>
                    <InputNumber value={desc.value ? desc.value: desc.info.min} id={desc.descriptor} name={desc.descriptor} min={desc.info.min} max={desc.info.max} step={desc.info.step} onChange={(event) => handleInputChange(idx, event.target.value)} key={desc.descriptor+'input'}/>
                    <Slider value={desc.value ? desc.value: desc.info.min} min={desc.info.min} max={desc.info.max} step={desc.info.step} onChange={(event) => handleInputChange(idx, event.value)} key={desc.descriptor+'slider'}/>
                </div>
            ))
            }
            </form>
        </div>
    ); 
}