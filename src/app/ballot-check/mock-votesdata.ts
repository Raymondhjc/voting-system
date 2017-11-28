// mock-data
// the title of positions
import {Candidate} from './candidate';
// presient vice president etc

export const questions: String[] = ['Your favorite soccer player in forward postion', 'Your favorite soccer player in midfield position', 'Your favorite soccer coach '];

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
        countsSound:  789,
        countsUnsure: 224,
        countsTotal: 1013,
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
        id: 10,
        name: 'Modrić',
        countsSound: 1324,
        countsUnsure: 254,
        countsTotal: 1578,
        rateSound: '33.2%',
        rateUnsure: '6.4%',
        rateTotal: '39.6%'
    },
    {
        id: 8,
        name: 'Kroos',
        countsSound:  729,
        countsUnsure: 124,
        countsTotal:  853,
        rateSound: '18.3%',
        rateUnsure: '3.1%',
        rateTotal: '21.4%'
    },
    {
        id: 14,
        name: 'Casemiro',
        countsSound: 1123,
        countsUnsure: 434,
        countsTotal: 1557,
        rateSound: '28.1%',
        rateUnsure: '10.9%',
        rateTotal: '39.0%'
    }
];
export const candidatesGR: Candidate[] = [
    {
        id: 4,
        name: 'Mourinho',
        countsSound: 1174,
        countsUnsure: 534,
        countsTotal: 1708,
        rateSound: '29.4%',
        rateUnsure: '13.4%',
        rateTotal: '42.8%'
    },
    {
        id: 5,
        name: 'Zidane',
        countsSound: 884,
        countsUnsure: 324,
        countsTotal: 1208,
        rateSound: '22.2%',
        rateUnsure: '8.1%',
        rateTotal: '30.3%'
    },
    {
        id: 6,
        name: 'Simeone',
        countsSound:  618,
        countsUnsure: 454,
        countsTotal:  1072,
        rateSound: '15.5%',
        rateUnsure: '11.4%',
        rateTotal: '26.9%'
    }
];


// pictures
