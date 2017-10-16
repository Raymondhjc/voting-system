// mock-data
// the title of positions
import {Candidate} from './candidate';
// presient vice president etc

export const titles: String[] = ['President', 'VicePresident', 'Governor'];


// the candidates under each positon
// we could change this to an shuzu  candidates[3]
export const candidatesP: Candidate[] = [
    {
        id: 7,
        name: 'Ronaldo',
        countsSound: 1254,
        countsUnsure: 234,
        countsTotal: 1488,
        rateSound: '31.5%',
        rateUnsure: '5.9%',
        rateTotal: '37.3%'
    },
    {
        id: 9,
        name: 'Benzema',
        countsSound: 789,
        countsUnsure: 221,
        countsTotal: 1010,
        rateSound: '19.8%',
        rateUnsure: '5.5%',
        rateTotal: '25.3%'
    },
    {
        id: 11,
        name: 'Bale',
        countsSound: 1254,
        countsUnsure: 233,
        countsTotal: 1487,
        rateSound: '31.5%',
        rateUnsure: '5.8%',
        rateTotal: '37.4%'
    }
];
export const candidatesVP: Candidate[] = [
    {
        id: 1,
        name: 'Neux',
        countsSound: 1324,
        countsUnsure: 254,
        countsTotal: 1488,
        rateSound: '38%',
        rateUnsure: '',
        rateTotal: ''
    },
    {
        id: 2,
        name: 'Helen',
        countsSound: 729,
        countsUnsure: 124,
        countsTotal: 1411,
        rateSound: '38%',
        rateUnsure: '',
        rateTotal: ''
    },
    {
        id: 3,
        name: 'Serra',
        countsSound: 124,
        countsUnsure: 434,
        countsTotal: 1483,
        rateSound: '38%',
        rateUnsure: '',
        rateTotal: ''
    }
];
export const candidatesGR: Candidate[] = [
    {
        id: 4,
        name: 'Charles',
        countsSound: 1174,
        countsUnsure: 534,
        countsTotal: 2388,
        rateSound: '38%',
        rateUnsure: '',
        rateTotal: ''
    },
    {
        id: 5,
        name: 'Daisy',
        countsSound: 784,
        countsUnsure: 324,
        countsTotal: 1448,
        rateSound: '38%',
        rateUnsure: '',
        rateTotal: ''
    },
    {
        id: 6,
        name: 'Thomas',
        countsSound: 454,
        countsUnsure: 454,
        countsTotal: 1408,
        rateSound: '38%',
        rateUnsure: '',
        rateTotal: ''
    }
];


// pictures
