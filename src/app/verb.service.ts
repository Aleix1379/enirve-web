import {Injectable} from '@angular/core';
import {Verb} from './interfaces/verb-interface';

@Injectable()
export class VerbService {

  private static verbs: Verb[] = [
    {id: 1, verb: 'arise', simple: 'arose', participle: 'arisen', matched: false},
    {id: 2, verb: 'be', simple: 'was / were', participle: 'been', matched: false},
    {id: 3, verb: 'beat', simple: 'beat', participle: 'beaten', matched: false},
    {id: 4, verb: 'become', simple: 'became', participle: 'become', matched: false},
    {id: 5, verb: 'begin', simple: 'began', participle: 'begun', matched: false},
    {id: 6, verb: 'bet', simple: 'bet/betted', participle: 'bet/betted', matched: false},
    {id: 7, verb: 'bite', simple: 'bit', participle: 'bitten', matched: false},
    {id: 8, verb: 'bleed', simple: 'bled', participle: 'bled', matched: false},
    {id: 9, verb: 'blow', simple: 'blew', participle: 'blown', matched: false},
    {id: 10, verb: 'break', simple: 'broke', participle: 'broken', matched: false},
    {id: 11, verb: 'bring', simple: 'brought', participle: 'brought', matched: false},
    {id: 12, verb: 'build', simple: 'built', participle: 'built', matched: false},
    {id: 13, verb: 'buy', simple: 'bought', participle: 'bought', matched: false},
    {id: 14, verb: 'catch', simple: 'caught', participle: 'caught', matched: false},
    {id: 15, verb: 'choose', simple: 'chose', participle: 'chosen', matched: false},
    {id: 16, verb: 'come', simple: 'came', participle: 'come', matched: false},
    {id: 17, verb: 'cost', simple: 'cost', participle: 'cost', matched: false},
    {id: 18, verb: 'creep', simple: 'crept', participle: 'crept', matched: false},
    {id: 19, verb: 'cut', simple: 'cut', participle: 'cut', matched: false},
    {id: 20, verb: 'deal', simple: 'dealt', participle: 'dealt', matched: false},
    {id: 21, verb: 'do', simple: 'did', participle: 'done', matched: false},
    {id: 22, verb: 'draw', simple: 'drew', participle: 'drawn', matched: false},
    {id: 23, verb: 'dream', simple: 'dreamt/dreamed', participle: 'dreamt/dreamed', matched: false},
    {id: 24, verb: 'drink', simple: 'drank', participle: 'drunk', matched: false},
    {id: 25, verb: 'drive', simple: 'drove', participle: 'driven', matched: false},
    {id: 26, verb: 'eat', simple: 'ate', participle: 'eaten', matched: false},
    {id: 27, verb: 'fall', simple: 'fell', participle: 'fallen', matched: false},
    {id: 28, verb: 'feed', simple: 'fed', participle: 'fed', matched: false},
    {id: 29, verb: 'feel', simple: 'felt', participle: 'felt', matched: false},
    {id: 30, verb: 'fight', simple: 'fought', participle: 'fought', matched: false},
    {id: 31, verb: 'find', simple: 'found', participle: 'found', matched: false},
    {id: 32, verb: 'flee', simple: 'fled', participle: 'fled', matched: false},
    {id: 33, verb: 'fly', simple: 'flew', participle: 'flown', matched: false},
    {id: 34, verb: 'forget', simple: 'forgot', participle: 'forgotten', matched: false},
    {id: 35, verb: 'forgive', simple: 'forgave', participle: 'forgiven', matched: false},
    {id: 36, verb: 'forsake', simple: 'forsook', participle: 'forsaken', matched: false},
    {id: 37, verb: 'freeze', simple: 'froze', participle: 'frozen', matched: false},
    {id: 38, verb: 'get', simple: 'got', participle: 'got', matched: false},
    {id: 39, verb: 'give', simple: 'gave', participle: 'given', matched: false},
    {id: 40, verb: 'go', simple: 'went', participle: 'gone', matched: false},
    {id: 41, verb: 'grind', simple: 'ground', participle: 'ground', matched: false},
    {id: 42, verb: 'grow', simple: 'grew', participle: 'grown', matched: false},
    {id: 43, verb: 'hang', simple: 'hung', participle: 'hung', matched: false},
    {id: 44, verb: 'have', simple: 'had', participle: 'had', matched: false},
    {id: 45, verb: 'hear', simple: 'heard', participle: 'heard', matched: false},
    {id: 46, verb: 'hide', simple: 'hid', participle: 'hidden', matched: false},
    {id: 47, verb: 'hit', simple: 'hit', participle: 'hit', matched: false},
    {id: 48, verb: 'hold', simple: 'held', participle: 'held', matched: false},
    {id: 49, verb: 'hurt', simple: 'hurt', participle: 'hurt', matched: false},
    {id: 50, verb: 'keep', simple: 'kept', participle: 'kept', matched: false},
    {id: 51, verb: 'kneel', simple: 'knelt', participle: 'knelt', matched: false},
    {id: 52, verb: 'know', simple: 'knew', participle: 'known', matched: false},
    {id: 53, verb: 'lead', simple: 'led', participle: 'led', matched: false},
    {id: 54, verb: 'learn', simple: 'learnt/learned', participle: 'learnt/learned', matched: false},
    {id: 55, verb: 'leave', simple: 'left', participle: 'left', matched: false},
    {id: 56, verb: 'lend', simple: 'lent', participle: 'lent', matched: false},
    {id: 57, verb: 'let', simple: 'let', participle: 'let', matched: false},
    {id: 58, verb: 'lie', simple: 'lay', participle: 'lain', matched: false},
    {id: 59, verb: 'lose', simple: 'lost', participle: 'lost', matched: false},
    {id: 60, verb: 'make', simple: 'made', participle: 'made', matched: false},
    {id: 61, verb: 'mean', simple: 'meant', participle: 'meant', matched: false},
    {id: 62, verb: 'meet', simple: 'met', participle: 'met', matched: false},
    {id: 63, verb: 'pay', simple: 'paid', participle: 'paid', matched: false},
    {id: 64, verb: 'put', simple: 'put', participle: 'put', matched: false},
    {id: 65, verb: 'quit', simple: 'quit/quitted', participle: 'quit/quitted', matched: false},
    {id: 66, verb: 'read', simple: 'read', participle: 'read', matched: false},
    {id: 67, verb: 'ride', simple: 'rode', participle: 'ridden', matched: false},
    {id: 68, verb: 'ring', simple: 'rang', participle: 'rung', matched: false},
    {id: 69, verb: 'rise', simple: 'rose', participle: 'risen', matched: false},
    {id: 70, verb: 'run', simple: 'ran', participle: 'run', matched: false},
    {id: 71, verb: 'say', simple: 'said', participle: 'said', matched: false},
    {id: 72, verb: 'see', simple: 'saw', participle: 'seen', matched: false},
    {id: 73, verb: 'sell', simple: 'sold', participle: 'sold', matched: false},
    {id: 74, verb: 'send', simple: 'sent', participle: 'sent', matched: false},
    {id: 75, verb: 'set', simple: 'set', participle: 'set', matched: false},
    {id: 76, verb: 'sew', simple: 'sewed', participle: 'sewn/sewed', matched: false},
    {id: 77, verb: 'shake', simple: 'shook', participle: 'shaken', matched: false},
    {id: 78, verb: 'shine', simple: 'shone', participle: 'shone', matched: false},
    {id: 79, verb: 'shoot', simple: 'shot', participle: 'shot', matched: false},
    {id: 80, verb: 'show', simple: 'showed', participle: 'shown/showed', matched: false},
    {id: 81, verb: 'shrink', simple: 'shrank/shrunk', participle: 'shrunk', matched: false},
    {id: 82, verb: 'shut', simple: 'shut', participle: 'shut', matched: false},
    {id: 83, verb: 'sing', simple: 'sang', participle: 'sung', matched: false},
    {id: 84, verb: 'sink', simple: 'sank', participle: 'sunk', matched: false},
    {id: 85, verb: 'sit', simple: 'sat', participle: 'sat', matched: false},
    {id: 86, verb: 'sleep', simple: 'slept', participle: 'slept', matched: false},
    {id: 87, verb: 'slide', simple: 'slid', participle: 'slid', matched: false},
    {id: 88, verb: 'sow', simple: 'sowed', participle: 'sown/sowed', matched: false},
    {id: 89, verb: 'speak', simple: 'spoke', participle: 'spoken', matched: false},
    {id: 90, verb: 'spell', simple: 'spelt/spelled', participle: 'spelt/spelled', matched: false},
    {id: 91, verb: 'spend', simple: 'spent', participle: 'spent', matched: false},
    {id: 92, verb: 'spill', simple: 'spilt/spilled', participle: 'spilt/spilled', matched: false},
    {id: 93, verb: 'split', simple: 'split', participle: 'split', matched: false},
    {id: 94, verb: 'spoil', simple: 'spoilt/spoiled', participle: 'spoilt/spoiled', matched: false},
    {id: 95, verb: 'spread', simple: 'spread', participle: 'spread', matched: false},
    {id: 96, verb: 'stand', simple: 'stood', participle: 'stood', matched: false},
    {id: 97, verb: 'steal', simple: 'stole', participle: 'stolen', matched: false},
    {id: 98, verb: 'sting', simple: 'stung', participle: 'stung', matched: false},
    {id: 99, verb: 'stink', simple: 'stank/stunk', participle: 'stunk', matched: false},
    {id: 100, verb: 'strike', simple: 'struck', participle: 'struck', matched: false},
    {id: 101, verb: 'swear', simple: 'swore', participle: 'sworn', matched: false},
    {id: 102, verb: 'sweep', simple: 'swept', participle: 'swept', matched: false},
    {id: 103, verb: 'swim', simple: 'swam', participle: 'swum', matched: false},
    {id: 104, verb: 'take', simple: 'took', participle: 'taken', matched: false},
    {id: 105, verb: 'teach', simple: 'taught', participle: 'taught', matched: false},
    {id: 106, verb: 'tear', simple: 'tore', participle: 'torn', matched: false},
    {id: 107, verb: 'tell', simple: 'told', participle: 'told', matched: false},
    {id: 108, verb: 'think', simple: 'thought', participle: 'thought', matched: false},
    {id: 109, verb: 'throw', simple: 'threw', participle: 'thrown', matched: false},
    {id: 110, verb: 'tread', simple: 'trode', participle: 'trodden/trod', matched: false},
    {id: 111, verb: 'understand', simple: 'understood', participle: 'understood', matched: false},
    {id: 112, verb: 'wake', simple: 'woke', participle: 'woken', matched: false},
    {id: 113, verb: 'wear', simple: 'wore', participle: 'worn', matched: false},
    {id: 114, verb: 'weave', simple: 'wove', participle: 'woven', matched: false},
    {id: 115, verb: 'weep', simple: 'wept', participle: 'wept', matched: false},
    {id: 116, verb: 'win', simple: 'won', participle: 'won', matched: false},
    {id: 117, verb: 'wring', simple: 'wrung', participle: 'wrung', matched: false},
    {id: 118, verb: 'write', simple: 'wrote', participle: 'written', matched: false}
  ];

  constructor() {
  }

  public static getAllVerbs(): Verb[] {
    VerbService.verbs.forEach(v => v.matched = false);
    return VerbService.verbs;
  }

  public static getVerbsById(idsVerbs: string | string[]): Verb[] {
    let id: number;
    let ids: number[];
    if (typeof idsVerbs === 'string') {
      id = Number(idsVerbs);
      return VerbService.verbs.filter(v => v.id === id);
    }
    ids = idsVerbs.map(idVerb => Number(idVerb));
    return VerbService.verbs.filter(v => ids.includes(v.id));
  }

}
