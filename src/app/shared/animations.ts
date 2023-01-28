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

export const fadeOutOnStartTrigger = trigger('fade-out-on-start', [
    transition(':leave', [
        style({
            opacity: '1'
        }),
        animate('600ms ease-out', style({
            opacity: '0'
        }))
    ])
])
    