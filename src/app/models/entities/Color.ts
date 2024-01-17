import { ColorType } from '../enums/ColorType';

export class Color {
    public label: string;
    public tailwindClass: string;

    private static colorMapping: { [key in ColorType]: { label: string; tailwindClass: string } } = {
        [ColorType.PINK]: { label: 'Rose', tailwindClass: 'calendar-pink' },
        [ColorType.PURPLE]: { label: 'Violet', tailwindClass: 'calendar-purple' },
        [ColorType.RED]: { label: 'Rouge', tailwindClass: 'calendar-red' },
        [ColorType.BLUE]: { label: 'Bleu', tailwindClass: 'calendar-blue' },
        [ColorType.GREEN]: { label: 'Vert', tailwindClass: 'calendar-green' },
        [ColorType.YELLOW]: { label: 'Jaune', tailwindClass: 'calendar-yellow' },
        [ColorType.ORANGE]: { label: 'Orange', tailwindClass: 'calendar-orange' },
        [ColorType.TEAL]: { label: 'Sarcelle', tailwindClass: 'calendar-teal' },
        [ColorType.INDIGO]: { label: 'Indigo', tailwindClass: 'calendar-indigo' },
        [ColorType.GRAY]: { label: 'Gris', tailwindClass: 'calendar-gray' },
        [ColorType.BROWN]: { label: 'Marron', tailwindClass: 'calendar-brown' },
        [ColorType.CYAN]: { label: 'Cyan', tailwindClass: 'calendar-cyan' },
        [ColorType.LIME]: { label: 'Citron vert', tailwindClass: 'calendar-lime' },
        [ColorType.AMBER]: { label: 'Ambre', tailwindClass: 'calendar-amber' },
        [ColorType.EMERALD]: { label: 'Émeraude', tailwindClass: 'calendar-emerald' },
        [ColorType.FUCHSIA]: { label: 'Fuchsia', tailwindClass: 'calendar-fuchsia' },
        [ColorType.MAGENTA]: { label: 'Magenta', tailwindClass: 'calendar-magenta' },
        [ColorType.MAROON]: { label: 'Bordeaux', tailwindClass: 'calendar-maroon' },
        [ColorType.OLIVE]: { label: 'Olive', tailwindClass: 'calendar-olive' },
        [ColorType.NAVY]: { label: 'Marine', tailwindClass: 'calendar-navy' },
    };

    constructor(colorType: ColorType) {
        const colorProperties = Color.colorMapping[colorType];
        this.label = colorProperties.label;
        this.tailwindClass = colorProperties.tailwindClass;
    }
}
