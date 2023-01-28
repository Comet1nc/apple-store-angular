import { trigger, style, transition, animate} from '@angular/animations';

export const fadeInOnStartTrigger = trigger('fade-in-on-start', [
    transition(':enter', [
    style({
        opacity: '0'
    }),
    animate('1000ms ease-in', style({
        opacity: '1'
    }))
    ])
])
    