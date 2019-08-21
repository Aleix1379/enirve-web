import {Injectable} from '@angular/core';
import {Verb} from '../../interfaces/Verb';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  private verbs: Verb[] = [
    {id: 1, present: 'arise', simple: 'arose', translations: {spanish: 'surgir'}, participle: 'arisen', matched: false},
    {id: 2, present: 'be', simple: 'was / were', translations: {spanish: 'ser'}, participle: 'been', matched: false},
    {id: 3, present: 'beat', simple: 'beat', translations: {spanish: 'golpear'}, participle: 'beaten', matched: false},
    {id: 4, present: 'become', simple: 'became', translations: {spanish: 'convertirse'}, participle: 'become', matched: false},
    {id: 5, present: 'begin', simple: 'began', translations: {spanish: 'comenzar'}, participle: 'begun', matched: false},
    {id: 6, present: 'bet', simple: 'bet/betted', translations: {spanish: 'apostar'}, participle: 'bet/betted', matched: false},
    {id: 7, present: 'bite', simple: 'bit', translations: {spanish: 'morder'}, participle: 'bitten', matched: false},
    {id: 8, present: 'bleed', simple: 'bled', translations: {spanish: 'sangrar'}, participle: 'bled', matched: false},
    {id: 9, present: 'blow', simple: 'blew', translations: {spanish: 'soplar'}, participle: 'blown', matched: false},
    {id: 10, present: 'break', simple: 'broke', translations: {spanish: 'romper'}, participle: 'broken', matched: false},
    {id: 11, present: 'bring', simple: 'brought', translations: {spanish: 'traer'}, participle: 'brought', matched: false},
    {id: 12, present: 'build', simple: 'built', translations: {spanish: 'construir'}, participle: 'built', matched: false},
    {id: 13, present: 'buy', simple: 'bought', translations: {spanish: 'comprar'}, participle: 'bought', matched: false},
    {id: 14, present: 'catch', simple: 'caught', translations: {spanish: 'atrapar'}, participle: 'caught', matched: false},
    {id: 15, present: 'choose', simple: 'chose', translations: {spanish: 'elegir'}, participle: 'chosen', matched: false},
    {id: 16, present: 'come', simple: 'came', translations: {spanish: 'venir'}, participle: 'come', matched: false},
    {id: 17, present: 'cost', simple: 'cost', translations: {spanish: 'costar'}, participle: 'cost', matched: false},
    {id: 18, present: 'creep', simple: 'crept', translations: {spanish: 'arrastrarse'}, participle: 'crept', matched: false},
    {id: 19, present: 'cut', simple: 'cut', translations: {spanish: 'cortar'}, participle: 'cut', matched: false},
    {id: 20, present: 'deal', simple: 'dealt', translations: {spanish: 'dar'}, participle: 'dealt', matched: false},
    {id: 21, present: 'do', simple: 'did', translations: {spanish: 'hacer'}, participle: 'done', matched: false},
    {id: 22, present: 'draw', simple: 'drew', translations: {spanish: 'dibujar'}, participle: 'drawn', matched: false},
    {id: 23, present: 'dream', simple: 'dreamt/dreamed', translations: {spanish: 'soñar'}, participle: 'dreamt/dreamed', matched: false},
    {id: 24, present: 'drink', simple: 'drank', translations: {spanish: 'beber'}, participle: 'drunk', matched: false},
    {id: 25, present: 'drive', simple: 'drove', translations: {spanish: 'conducir'}, participle: 'driven', matched: false},
    {id: 26, present: 'eat', simple: 'ate', translations: {spanish: 'comer'}, participle: 'eaten', matched: false},
    {id: 27, present: 'fall', simple: 'fell', translations: {spanish: 'caer'}, participle: 'fallen', matched: false},
    {id: 28, present: 'feed', simple: 'fed', translations: {spanish: 'alimentar'}, participle: 'fed', matched: false},
    {id: 29, present: 'feel', simple: 'felt', translations: {spanish: 'sentir'}, participle: 'felt', matched: false},
    {id: 30, present: 'fight', simple: 'fought', translations: {spanish: 'pelear'}, participle: 'fought', matched: false},
    {id: 31, present: 'find', simple: 'found', translations: {spanish: 'encontrar'}, participle: 'found', matched: false},
    {id: 32, present: 'flee', simple: 'fled', translations: {spanish: 'huir'}, participle: 'fled', matched: false},
    {id: 33, present: 'fly', simple: 'flew', translations: {spanish: 'volar'}, participle: 'flown', matched: false},
    {id: 34, present: 'forget', simple: 'forgot', translations: {spanish: 'olvidar'}, participle: 'forgotten', matched: false},
    {id: 35, present: 'forgive', simple: 'forgave', translations: {spanish: 'perdonar'}, participle: 'forgiven', matched: false},
    {id: 36, present: 'forsake', simple: 'forsook', translations: {spanish: 'abandonar'}, participle: 'forsaken', matched: false},
    {id: 37, present: 'freeze', simple: 'froze', translations: {spanish: 'congelar'}, participle: 'frozen', matched: false},
    {id: 38, present: 'get', simple: 'got', translations: {spanish: 'tener'}, participle: 'got', matched: false},
    {id: 39, present: 'give', simple: 'gave', translations: {spanish: 'dar'}, participle: 'given', matched: false},
    {id: 40, present: 'go', simple: 'went', translations: {spanish: 'ir'}, participle: 'gone', matched: false},
    {id: 41, present: 'grind', simple: 'ground', translations: {spanish: 'moler'}, participle: 'ground', matched: false},
    {id: 42, present: 'grow', simple: 'grew', translations: {spanish: 'crecer'}, participle: 'grown', matched: false},
    {id: 43, present: 'hang', simple: 'hung', translations: {spanish: 'colgar'}, participle: 'hung', matched: false},
    {id: 44, present: 'have', simple: 'had', translations: {spanish: 'tener'}, participle: 'had', matched: false},
    {id: 45, present: 'hear', simple: 'heard', translations: {spanish: 'oír'}, participle: 'heard', matched: false},
    {id: 46, present: 'hide', simple: 'hid', translations: {spanish: 'esconderse'}, participle: 'hidden', matched: false},
    {id: 47, present: 'hit', simple: 'hit', translations: {spanish: 'golpear'}, participle: 'hit', matched: false},
    {id: 48, present: 'hold', simple: 'held', translations: {spanish: 'tener'}, participle: 'held', matched: false},
    {id: 49, present: 'hurt', simple: 'hurt', translations: {spanish: 'herir'}, participle: 'hurt', matched: false},
    {id: 50, present: 'keep', simple: 'kept', translations: {spanish: 'guardar'}, participle: 'kept', matched: false},
    {id: 51, present: 'kneel', simple: 'knelt', translations: {spanish: 'arrodillarse'}, participle: 'knelt', matched: false},
    {id: 52, present: 'know', simple: 'knew', translations: {spanish: 'saber'}, participle: 'known', matched: false},
    {id: 53, present: 'lead', simple: 'led', translations: {spanish: 'encabezar'}, participle: 'led', matched: false},
    {id: 54, present: 'learn', simple: 'learnt/learned', translations: {spanish: 'aprender'}, participle: 'learnt/learned', matched: false},
    {id: 55, present: 'leave', simple: 'left', translations: {spanish: 'dejar'}, participle: 'left', matched: false},
    {id: 56, present: 'lend', simple: 'lent', translations: {spanish: 'prestar'}, participle: 'lent', matched: false},
    {id: 57, present: 'let', simple: 'let', translations: {spanish: 'dejar'}, participle: 'let', matched: false},
    {id: 58, present: 'lie', simple: 'lay', translations: {spanish: 'yacer'}, participle: 'lain', matched: false},
    {id: 59, present: 'lose', simple: 'lost', translations: {spanish: 'perder'}, participle: 'lost', matched: false},
    {id: 60, present: 'make', simple: 'made', translations: {spanish: 'hacer'}, participle: 'made', matched: false},
    {id: 61, present: 'mean', simple: 'meant', translations: {spanish: 'significar'}, participle: 'meant', matched: false},
    {id: 62, present: 'meet', simple: 'met', translations: {spanish: 'conocer'}, participle: 'met', matched: false},
    {id: 63, present: 'pay', simple: 'paid', translations: {spanish: 'pagar'}, participle: 'paid', matched: false},
    {id: 64, present: 'put', simple: 'put', translations: {spanish: 'poner'}, participle: 'put', matched: false},
    {id: 65, present: 'quit', simple: 'quit/quitted', translations: {spanish: 'abandonar'}, participle: 'quit/quitted', matched: false},
    {id: 66, present: 'read', simple: 'read', translations: {spanish: 'leer'}, participle: 'read', matched: false},
    {id: 67, present: 'ride', simple: 'rode', translations: {spanish: 'montar'}, participle: 'ridden', matched: false},
    {id: 68, present: 'ring', simple: 'rang', translations: {spanish: 'llamar '}, participle: 'rung', matched: false},
    {id: 69, present: 'rise', simple: 'rose', translations: {spanish: 'elevar'}, participle: 'risen', matched: false},
    {id: 70, present: 'run', simple: 'ran', translations: {spanish: 'correr'}, participle: 'run', matched: false},
    {id: 71, present: 'say', simple: 'said', translations: {spanish: 'decir'}, participle: 'said', matched: false},
    {id: 72, present: 'see', simple: 'saw', translations: {spanish: 'ver'}, participle: 'seen', matched: false},
    {id: 73, present: 'sell', simple: 'sold', translations: {spanish: 'vender'}, participle: 'sold', matched: false},
    {id: 74, present: 'send', simple: 'sent', translations: {spanish: 'enviar'}, participle: 'sent', matched: false},
    {id: 75, present: 'set', simple: 'set', translations: {spanish: 'fijar'}, participle: 'set', matched: false},
    {id: 76, present: 'sew', simple: 'sewed', translations: {spanish: 'coser'}, participle: 'sewn/sewed', matched: false},
    {id: 77, present: 'shake', simple: 'shook', translations: {spanish: 'sacudir'}, participle: 'shaken', matched: false},
    {id: 78, present: 'shine', simple: 'shone', translations: {spanish: 'brillar'}, participle: 'shone', matched: false},
    {id: 79, present: 'shoot', simple: 'shot', translations: {spanish: 'disparar'}, participle: 'shot', matched: false},
    {id: 80, present: 'show', simple: 'showed', translations: {spanish: 'mostrar'}, participle: 'shown/showed', matched: false},
    {id: 81, present: 'shrink', simple: 'shrank/shrunk', translations: {spanish: 'encoger'}, participle: 'shrunk', matched: false},
    {id: 82, present: 'shut', simple: 'shut', translations: {spanish: 'cerrar'}, participle: 'shut', matched: false},
    {id: 83, present: 'sing', simple: 'sang', translations: {spanish: 'cantar'}, participle: 'sung', matched: false},
    {id: 84, present: 'sink', simple: 'sank', translations: {spanish: 'hundir'}, participle: 'sunk', matched: false},
    {id: 85, present: 'sit', simple: 'sat', translations: {spanish: 'sentarse'}, participle: 'sat', matched: false},
    {id: 86, present: 'sleep', simple: 'slept', translations: {spanish: 'dormir'}, participle: 'slept', matched: false},
    {id: 87, present: 'slide', simple: 'slid', translations: {spanish: 'deslizar'}, participle: 'slid', matched: false},
    {id: 88, present: 'sow', simple: 'sowed', translations: {spanish: 'sembrar'}, participle: 'sown/sowed', matched: false},
    {id: 89, present: 'speak', simple: 'spoke', translations: {spanish: 'hablar'}, participle: 'spoken', matched: false},
    {id: 90, present: 'spell', simple: 'spelt/spelled', translations: {spanish: 'deletrear'}, participle: 'spelt/spelled', matched: false},
    {id: 91, present: 'spend', simple: 'spent', translations: {spanish: 'gastar'}, participle: 'spent', matched: false},
    {id: 92, present: 'spill', simple: 'spilt/spilled', translations: {spanish: 'derramar'}, participle: 'spilt/spilled', matched: false},
    {id: 93, present: 'split', simple: 'split', translations: {spanish: 'partir'}, participle: 'split', matched: false},
    {
      id: 94,
      present: 'spoil',
      simple: 'spoilt/spoiled',
      translations: {spanish: 'estropear'},
      participle: 'spoilt/spoiled',
      matched: false
    },
    {id: 95, present: 'spread', simple: 'spread', translations: {spanish: 'extenderse'}, participle: 'spread', matched: false},
    {id: 96, present: 'stand', simple: 'stood', translations: {spanish: 'estar '}, participle: 'stood', matched: false},
    {id: 97, present: 'steal', simple: 'stole', translations: {spanish: 'robar'}, participle: 'stolen', matched: false},
    {id: 98, present: 'sting', simple: 'stung', translations: {spanish: 'picar'}, participle: 'stung', matched: false},
    {id: 99, present: 'stink', simple: 'stank/stunk', translations: {spanish: 'apestar'}, participle: 'stunk', matched: false},
    {id: 100, present: 'strike', simple: 'struck', translations: {spanish: 'golpear'}, participle: 'struck', matched: false},
    {id: 101, present: 'swear', simple: 'swore', translations: {spanish: 'jurar'}, participle: 'sworn', matched: false},
    {id: 102, present: 'sweep', simple: 'swept', translations: {spanish: 'barrer'}, participle: 'swept', matched: false},
    {id: 103, present: 'swim', simple: 'swam', translations: {spanish: 'nadar'}, participle: 'swum', matched: false},
    {id: 104, present: 'take', simple: 'took', translations: {spanish: 'tomar'}, participle: 'taken', matched: false},
    {id: 105, present: 'teach', simple: 'taught', translations: {spanish: 'enseñar'}, participle: 'taught', matched: false},
    {id: 106, present: 'tear', simple: 'tore', translations: {spanish: 'romper'}, participle: 'torn', matched: false},
    {id: 107, present: 'tell', simple: 'told', translations: {spanish: 'decir'}, participle: 'told', matched: false},
    {id: 108, present: 'think', simple: 'thought', translations: {spanish: 'pensar'}, participle: 'thought', matched: false},
    {id: 109, present: 'throw', simple: 'threw', translations: {spanish: 'lanzar'}, participle: 'thrown', matched: false},
    {id: 110, present: 'tread', simple: 'trode', translations: {spanish: 'pisar'}, participle: 'trodden/trod', matched: false},
    {id: 111, present: 'understand', simple: 'understood', translations: {spanish: 'entender'}, participle: 'understood', matched: false},
    {id: 112, present: 'wake', simple: 'woke', translations: {spanish: 'despertarse'}, participle: 'woken', matched: false},
    {id: 113, present: 'wear', simple: 'wore', translations: {spanish: 'llevar '}, participle: 'worn', matched: false},
    {id: 114, present: 'weave', simple: 'wove', translations: {spanish: 'tejer'}, participle: 'woven', matched: false},
    {id: 115, present: 'weep', simple: 'wept', translations: {spanish: 'llorar'}, participle: 'wept', matched: false},
    {id: 116, present: 'win', simple: 'won', translations: {spanish: 'ganar'}, participle: 'won', matched: false},
    {id: 117, present: 'wring', simple: 'wrung', translations: {spanish: 'retorcer'}, participle: 'wrung', matched: false},
    {id: 118, present: 'write', simple: 'wrote', translations: {spanish: 'escribir'}, participle: 'written', matched: false}
  ];

  constructor() {
  }

  getAll(): Verb[] {
    return [...this.verbs];
  }

  getById(idsVerbs: string | string[]): Verb[] {
    let id: number;
    let ids: number[];
    if (typeof idsVerbs === 'string') {
      id = Number(idsVerbs);
      return this.verbs.filter(v => v.id === id);
    }
    ids = idsVerbs.map(idVerb => Number(idVerb));
    return [...this.verbs.filter(v => ids.includes(v.id))];
  }

  getByName(verbPresent: string): Verb {
    return this.getAll().find(verb => verb.present === verbPresent);
  }
}
