import { Component }        from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <my-nav></my-nav>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent { }
