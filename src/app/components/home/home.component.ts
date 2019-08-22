import {Component, OnInit} from '@angular/core';
import {VerbService} from '../../services/verb/verb.service';
import {Router} from '@angular/router';
import {Section} from '../../interfaces/Section';
import {SectionService} from '../../services/section/section.service';
import {UserService} from '../../services/user/user.service';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {Token} from '../../interfaces/Token';
import {Progress, User} from '../../interfaces/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sections: Section[];
  user: User;
  showLoginRequired = false;

  private static getDefaultProgress(): Progress[] {
    return [
      {
        sectionId: 1,
        verbs: [
          {
            id: 1,
            completed: false
          },
          {
            id: 2,
            completed: false
          },
          {
            id: 3,
            completed: false
          },
          {
            id: 4,
            completed: false
          },
          {
            id: 5,
            completed: false
          },
          {
            id: 6,
            completed: false
          },
          {
            id: 7,
            completed: false
          },
          {
            id: 8,
            completed: false
          },
          {
            id: 9,
            completed: false
          },
          {
            id: 10,
            completed: false
          }
        ]
      },
      {
        sectionId: 2,
        verbs: [
          {
            id: 11,
            completed: false
          },
          {
            id: 12,
            completed: false
          },
          {
            id: 13,
            completed: false
          },
          {
            id: 14,
            completed: false
          },
          {
            id: 15,
            completed: false
          },
          {
            id: 16,
            completed: false
          },
          {
            id: 17,
            completed: false
          },
          {
            id: 18,
            completed: false
          },
          {
            id: 19,
            completed: false
          },
          {
            id: 20,
            completed: false
          }
        ]
      },
      {
        sectionId: 3,
        verbs: [
          {
            id: 21,
            completed: false
          },
          {
            id: 22,
            completed: false
          },
          {
            id: 23,
            completed: false
          },
          {
            id: 24,
            completed: false
          },
          {
            id: 25,
            completed: false
          },
          {
            id: 26,
            completed: false
          },
          {
            id: 27,
            completed: false
          },
          {
            id: 28,
            completed: false
          },
          {
            id: 29,
            completed: false
          },
          {
            id: 30,
            completed: false
          }
        ]
      },
      {
        sectionId: 4,
        verbs: [
          {
            id: 31,
            completed: false
          },
          {
            id: 32,
            completed: false
          },
          {
            id: 33,
            completed: false
          },
          {
            id: 34,
            completed: false
          },
          {
            id: 35,
            completed: false
          },
          {
            id: 36,
            completed: false
          },
          {
            id: 37,
            completed: false
          },
          {
            id: 38,
            completed: false
          },
          {
            id: 39,
            completed: false
          },
          {
            id: 40,
            completed: false
          }
        ]
      },
      {
        sectionId: 5,
        verbs: [
          {
            id: 41,
            completed: false
          },
          {
            id: 42,
            completed: false
          },
          {
            id: 43,
            completed: false
          },
          {
            id: 44,
            completed: false
          },
          {
            id: 45,
            completed: false
          },
          {
            id: 46,
            completed: false
          },
          {
            id: 47,
            completed: false
          },
          {
            id: 48,
            completed: false
          },
          {
            id: 49,
            completed: false
          },
          {
            id: 50,
            completed: false
          }
        ]
      },
      {
        sectionId: 6,
        verbs: [
          {
            id: 51,
            completed: false
          },
          {
            id: 52,
            completed: false
          },
          {
            id: 53,
            completed: false
          },
          {
            id: 54,
            completed: false
          },
          {
            id: 55,
            completed: false
          },
          {
            id: 56,
            completed: false
          },
          {
            id: 57,
            completed: false
          },
          {
            id: 58,
            completed: false
          },
          {
            id: 59,
            completed: false
          },
          {
            id: 60,
            completed: false
          }
        ]
      },
      {
        sectionId: 7,
        verbs: [
          {
            id: 61,
            completed: false
          },
          {
            id: 62,
            completed: false
          },
          {
            id: 63,
            completed: false
          },
          {
            id: 64,
            completed: false
          },
          {
            id: 65,
            completed: false
          },
          {
            id: 66,
            completed: false
          },
          {
            id: 67,
            completed: false
          },
          {
            id: 68,
            completed: false
          },
          {
            id: 69,
            completed: false
          },
          {
            id: 70,
            completed: false
          }
        ]
      },
      {
        sectionId: 8,
        verbs: [
          {
            id: 71,
            completed: false
          },
          {
            id: 72,
            completed: false
          },
          {
            id: 73,
            completed: false
          },
          {
            id: 74,
            completed: false
          },
          {
            id: 75,
            completed: false
          },
          {
            id: 76,
            completed: false
          },
          {
            id: 77,
            completed: false
          },
          {
            id: 78,
            completed: false
          },
          {
            id: 79,
            completed: false
          },
          {
            id: 80,
            completed: false
          }
        ]
      },
      {
        sectionId: 9,
        verbs: [
          {
            id: 81,
            completed: false
          },
          {
            id: 82,
            completed: false
          },
          {
            id: 83,
            completed: false
          },
          {
            id: 84,
            completed: false
          },
          {
            id: 85,
            completed: false
          },
          {
            id: 86,
            completed: false
          },
          {
            id: 87,
            completed: false
          },
          {
            id: 88,
            completed: false
          },
          {
            id: 89,
            completed: false
          },
          {
            id: 90,
            completed: false
          }
        ]
      },
      {
        sectionId: 10,
        verbs: [
          {
            id: 91,
            completed: false
          },
          {
            id: 92,
            completed: false
          },
          {
            id: 93,
            completed: false
          },
          {
            id: 94,
            completed: false
          },
          {
            id: 95,
            completed: false
          },
          {
            id: 96,
            completed: false
          },
          {
            id: 97,
            completed: false
          },
          {
            id: 98,
            completed: false
          },
          {
            id: 99,
            completed: false
          },
          {
            id: 100,
            completed: false
          }
        ]
      },
      {
        sectionId: 11,
        verbs: [
          {
            id: 101,
            completed: false
          },
          {
            id: 102,
            completed: false
          },
          {
            id: 103,
            completed: false
          },
          {
            id: 104,
            completed: false
          },
          {
            id: 105,
            completed: false
          },
          {
            id: 106,
            completed: false
          },
          {
            id: 107,
            completed: false
          },
          {
            id: 108,
            completed: false
          },
          {
            id: 109,
            completed: false
          },
          {
            id: 110,
            completed: false
          }
        ]
      },
      {
        sectionId: 12,
        verbs: [
          {
            id: 111,
            completed: false
          },
          {
            id: 112,
            completed: false
          },
          {
            id: 113,
            completed: false
          },
          {
            id: 114,
            completed: false
          },
          {
            id: 115,
            completed: false
          },
          {
            id: 116,
            completed: false
          },
          {
            id: 117,
            completed: false
          },
          {
            id: 118,
            completed: false
          }
        ]
      }
    ];
  }

  constructor(private router: Router,
              private verbService: VerbService,
              private userService: UserService,
              private sectionService: SectionService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.sections = this.sectionService.getSections();
    this.downloadUser();
  }

  private downloadUser() {
    const token = this.localStorageService.getItem<Token>('auth-token');
    if (token) {
      this.userService.find('code', token.userCode).subscribe(
        (user: User) => {
          this.user = user;
          this.showLoginRequired = false;
          this.loadProgress(user.progress.activity);
        }
      );
    } else {
      this.showLoginRequired = !this.localStorageService.getItem<boolean>('use-app-without-user');
      this.loadProgress(HomeComponent.getDefaultProgress());
      console.log(`There is no token.... 😳😭🥶😓`);
    }
  }

  private loadProgress(userProgress: Progress[]) {
    this.sections.forEach(section => {
      section.current = userProgress
        .find(userSectionProgress => userSectionProgress.sectionId === section.id)
        .verbs
        .filter(verb => verb.completed)
        .length;
    });
  }

  startExercises(section: Section) {
    this.router
      .navigateByUrl(`/exercises/${section.id}`)
      .catch(console.error);
  }

  closeLoginRequired() {
    this.showLoginRequired = false;
    this.localStorageService.setItem<boolean>('use-app-without-user', true);
  }

  getVerbIsCompleted(sectionId: number, verbId: number) {
    const section = this.user.progress.activity.find(activity => activity.sectionId === sectionId);
    if (section) {
      const currentVerb = section.verbs.find(verb => verb.id === verbId);
      return currentVerb ? currentVerb.completed : false;
    }
    return false;
  }

}
