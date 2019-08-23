import {Injectable} from '@angular/core';
import {Verb} from '../../interfaces/Verb';
import {VerbService} from '../verb/verb.service';
import {Section} from '../../interfaces/Section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private readonly NUMBER_OF_SECTIONS = 12; // 118 verbs in 12 sections, 10 verbs per sections. 10 * 12 = 120
  private verbs: Verb[];
  private sections: Section[] = [];

  constructor(private verbService: VerbService) {
  }

  getSections(): Section[] {
    this.sections = [];
    this.verbs = this.verbService.getAll();
    for (let i = 1; i <= this.NUMBER_OF_SECTIONS; i++) {
      const sectionVerbs: Verb[] = this.spliceSectionVerbs();
      this.sections.push(
        {
          id: i,
          title: `Lesson ${i}`,
          current: null, // Math.floor(Math.random() * (8 + 1)), // data from server, user progress...
          max: sectionVerbs.length,
          verbs: sectionVerbs
        }
      );
    }
    return this.sections;
  }

  getSectionById(sectionId: number): Section {
    if (this.sections.length === 0) {
      this.getSections();
    }
    return this.sections.find(section => section.id === sectionId);
  }

  private spliceSectionVerbs() {
    return this.verbs.splice(0, 10);
  }

}
