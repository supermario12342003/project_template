import { Component }        from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <my-nav></my-nav>
        <alert></alert>
        <div class="my-content">
        	<router-outlet></router-outlet>
        </div>
    `,
})
export class AppComponent {}
