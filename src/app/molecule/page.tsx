"use client"
import { Slider } from 'primereact/slider';
import {moleculeDescriptorsInfo, descriptor, descriptorNames} from './consts'
import { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { gql, useQuery } from '@apollo/client';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Chart } from 'primereact/chart';
import { Message } from 'primereact/message';

export default function Molecule() {
    const queryInterpret = gql`query ($descriptors: Descriptors!){ interpretPermeabilityByMolecularDescriptors(descriptors:$descriptors) }`
    const queryPredict = gql`query ($descriptors: Descriptors!){ predictPermeabilityByMolecularDescriptors(descriptors:$descriptors) }`
    
    const [descriptorInputs, setDescriptorInputs] = useState(moleculeDescriptorsInfo)
    
    const {loading: loadingInterpret, error: errorInterpret, data: dataInterpret} = useQuery(queryInterpret, {variables:{descriptors: descriptorInputs.map((e) => e.value)}})
    const {loading: loadingPredict, error: errorPredict, data: dataPredict} = useQuery(queryPredict, {variables:{descriptors: descriptorInputs.map((e) => e.value)}})
    
    const chartData = {labels: moleculeDescriptorsInfo.map((e)=> e.descriptor), datasets: [{label: 'Interpretation Values', data: dataInterpret && dataInterpret.interpretPermeabilityByMolecularDescriptors}]}
    
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
                        {errorPredict &&  <Message severity="error" text={errorPredict.message} />}
                        { loadingPredict && <ProgressSpinner />}
                            { dataPredict &&
                            <div style={{alignItems: 'center'}}>
                                <h2 style={ {textAlign: 'center'} }>
                                    { dataPredict.predictPermeabilityByMolecularDescriptors.toFixed(2) + " / 3.0" }
                                </h2>
                            </div> 
                                
                            }
                    </div>
                    <div className='align-items-center'>
                        { errorInterpret &&  <Message severity="error" text={errorInterpret.message} /> }
                        { loadingInterpret && <ProgressSpinner />}
                        { dataInterpret && 
                        <Chart type='bar' data={chartData} height='250%' options={{indexAxis: 'y'}}></Chart>
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    ); 
}