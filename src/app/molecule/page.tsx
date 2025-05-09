"use client"
import { Slider } from 'primereact/slider';
import {moleculeDescriptorsInfo, descriptor} from './consts'
import { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { gql, useQuery } from '@apollo/client';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Chart } from 'primereact/chart';

export default function Molecule() {
    const queryInterpret = gql`query ($descriptors: Descriptors!){ interpretPermeabilityByMolecularDescriptors(descriptors:$descriptors) }`
    const queryPredict = gql`query ($descriptors: Descriptors!){ predictPermeabilityByMolecularDescriptors(descriptors:$descriptors) }`
    
    const [descriptorInputs, setDescriptorInputs] = useState(moleculeDescriptorsInfo)
    
    const {loading: loadingInterpret, error: errorInterpret, data: dataInterpret} = useQuery(queryInterpret, {variables:{descriptors: descriptorInputs.map((e) => e.value)}})
    const {loading: loadingPredict, error: errorPredict, data: dataPredict} = useQuery(queryPredict, {variables:{descriptors: descriptorInputs.map((e) => e.value)}})

    const handleInputChange = (index: number, val: number) => {
        const newdescriptorInputs = [...descriptorInputs];
        newdescriptorInputs[index].value = val;
        setDescriptorInputs(newdescriptorInputs);
    };

    return (
        <div>
            <h1>Molecule MycoPermeNet</h1>
            <div className="flex flex-column-2">
                <div className="flex flex-column gap-2 w-6 m-1">
                    {descriptorInputs.map((desc, idx) => (
                        <div className="flex flex-column gap-2 m-2" key={desc.descriptor+'div'}>
                            <label htmlFor={desc.descriptor} key={desc.descriptor+'label'}>{desc.descriptor}</label>
                            <InputNumber value={desc.value} id={desc.descriptor} name={desc.descriptor} min={desc.info.min} max={desc.info.max} step={desc.info.step} onChange={(event) => handleInputChange(idx, event.value)} key={desc.descriptor+'input'}/>
                            <Slider value={desc.value} min={desc.info.min} max={desc.info.max} step={desc.info.step} onChange={(event) => handleInputChange(idx, event.value)} key={desc.descriptor+'slider'}/>
                        </div>
                    ))
                    }
                </div>
                <div className="flex flex-column gap-2 h-2 w-6 m-1">
                    <div className="flex flex-column gap-2 m-1">
                        { loadingPredict && <ProgressSpinner />}
                        { dataPredict && dataPredict.predictPermeabilityByMolecularDescriptors }
                    </div>
                    <div className="flex flex-column gap-2 h-2 w-6 m-1">
                        { loadingInterpret && <ProgressSpinner />}
                        { dataInterpret && dataInterpret.interpretPermeabilityByMolecularDescriptors }
                    </div>
                    
                </div>
            </div>
        </div>
    ); 
}