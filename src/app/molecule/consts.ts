type descriptorInfo = {
    min: number
    max: number
    step: number
}

export type descriptor = {
    descriptor: string
    info: descriptorInfo
    value?: number
}

export const moleculeDescriptorsInfo: descriptor[] = [
    {descriptor: 'HBA', info: {min: 1, max: 20, step:1}},
    {descriptor: 'HBD', info: {min: 0, max: 10, step:1}}, 
    {descriptor: 'HBA+HBD', info: {min: 1, max: 30, step:1}},
    {descriptor: 'NumRings', info: {min: 0, max: 10, step:1}},
    {descriptor: 'RTB', info: {min: 0, max: 20, step:1}},
    {descriptor: 'NumAmideBonds', info: {min: 0, max: 5, step:1}},
    {descriptor: 'Globularity', info: {min: 0, max: 1.0, step: 0.05}},
    {descriptor: 'PBF', info: {min: 0, max: 2.0, step: 0.1}},
    {descriptor: 'TPSA', info: {min: 20.0, max: 300.0, step:10.0}},
    {descriptor: 'logP', info: {min: -10, max: 10, step:0.5}},
    {descriptor: 'MR', info: {min: 10.0, max: 200.0, step: 10.0}},
    {descriptor: 'MW', info: {min: 50.0, max: 1000.0, step:50.0}},
    {descriptor: 'Csp3', info: {min: 0, max: 1, step:0.05}},
    {descriptor: 'fmf', info: {min: 0, max: 1, step:0.05}}, 
    {descriptor: 'QED', info: {min: 0, max: 1, step:0.05}}, 
    {descriptor: 'HAC', info: {min: 5, max: 50, step:5}}, 
    {descriptor: 'NumRingsFused', info: {min: 0, max: 10, step: 1}}, 
    {descriptor: 'unique_HBAD', info: {min: 1, max: 20, step:1}},
    {descriptor: 'max_ring_size', info: {min: 0, max: 20, step:1}},
    {descriptor: 'n_chiral_centers', info: {min: 0, max: 20, step:1}},
    {descriptor: 'fcsp3_bm', info: {min: 0.0, max: 5.0, step:1.0}},
    {descriptor: 'formal_charge', info: {min: -5, max: 5, step:1}},
    {descriptor: 'abs_charge', info: {min: 0, max: 5, step:1}}
]