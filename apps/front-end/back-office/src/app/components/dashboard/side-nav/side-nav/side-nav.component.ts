import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface NavItem {
  name: string;
  path: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'webonjour-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  navItems: NavItem[] = [
    {
      name: 'Les Quiz',
      path: 'quiz',
      icon: 'assets/side-nav/quizlist.svg',
      active: false,
    },
    {
      name: 'Patients',
      path: 'patients',
      icon: 'assets/side-nav/patient.svg',
      active: false,
    },
  ];
  commonCssClass = 'nav-link text-white';

  constructor(private activatedRoute: ActivatedRoute) {}

  get mappedNavItems() {
    return this.navItems.map((navItem) => {
      // dashboard is a nested route, so we need to check the parent route as well
      return {
        ...navItem,
        active:
          this.activatedRoute.snapshot?.firstChild?.routeConfig?.path ===
            navItem.path ||
          this.activatedRoute.snapshot.parent?.routeConfig?.path ===
            navItem.path,
        cssClass:
          this.commonCssClass +
          (this.activatedRoute.snapshot?.firstChild?.routeConfig?.path ===
            navItem.path ||
          this.activatedRoute.snapshot.parent?.routeConfig?.path ===
            navItem.path
            ? ' active'
            : ''),
        path: `dashboard/${navItem.path}`,
      };
    });
  }
}
