/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable import/no-nodejs-modules */
/* eslint-disable no-console */
/*
 * Generates src/Sulu/Bundle/AdminBundle/Resources/js/components/Icon/iconSvgMap.js.
 *
 * The admin keeps its legacy icon names ("su-*" from the sulu IcoMoon font, "fa-*" from Font Awesome). This script
 * maps those names to Lucide icons (https://lucide.dev, ISC licensed) and writes their SVG markup into a static map
 * which is rendered inline by the Icon component. Names that are not listed here keep rendering through the fonts.
 *
 * Usage: node scripts/generate-icon-map.js
 *
 * "lucide-static" is a devDependency and only needed when running this script, the generated file is committed.
 * A value is either a Lucide icon name or an object {icon: string, fill: true} for glyphs that have to be solid.
 */
const fs = require('fs');
const path = require('path');

const STROKE_WIDTH = '1.75';
const LUCIDE_ICONS_PATH = path.join(path.dirname(require.resolve('lucide-static/package.json')), 'icons');
const TARGET_PATH = path.join(
    __dirname,
    '../src/Sulu/Bundle/AdminBundle/Resources/js/components/Icon/iconSvgMap.js'
);

const ICONS = {
    // sulu icon font
    'su-align-center': 'text-align-center',
    'su-align-justify': 'text-align-justify',
    'su-align-left': 'text-align-start',
    'su-align-right': 'text-align-end',
    'su-angle-down': 'chevron-down',
    'su-angle-left': 'chevron-left',
    'su-angle-right': 'chevron-right',
    'su-angle-up': 'chevron-up',
    'su-archive': 'archive',
    'su-arrow-down': 'arrow-down',
    'su-arrow-left': 'arrow-left',
    'su-arrow-right': 'arrow-right',
    'su-arrow-up': 'arrow-up',
    'su-arrows-alt': 'move',
    'su-at': 'at-sign',
    'su-audio': 'volume-2',
    'su-ban': 'ban',
    'su-bars': 'menu',
    'su-battery-empty': 'battery',
    'su-battery-full': 'battery-full',
    'su-battery-low': 'battery-low',
    'su-bell': 'bell',
    'su-bluetooth': 'bluetooth',
    'su-bold': 'bold',
    'su-brush': 'paintbrush',
    'su-calendar': 'calendar',
    'su-camera': 'camera',
    'su-cancel': 'circle-x',
    'su-check': 'check',
    'su-check-circle': 'circle-check',
    'su-circle': 'circle',
    'su-circle-full': {icon: 'circle', fill: true},
    'su-clean': 'brush-cleaning',
    'su-clock': 'clock',
    'su-cloud': 'cloud',
    'su-code': 'code',
    'su-cog': 'settings',
    'su-collapse-vertical': 'chevrons-down-up',
    'su-columns': 'columns-3',
    'su-comment': 'message-square',
    'su-copy': 'copy',
    'su-copyright': 'copyright',
    'su-credit-card': 'credit-card',
    'su-cut': 'scissors',
    'su-desktop': 'monitor',
    'su-document': 'file',
    'su-dollar': 'dollar-sign',
    'su-download': 'download',
    'su-duplicate': 'copy-plus',
    'su-earth': 'earth',
    'su-enter': 'log-in',
    'su-envelope': 'mail',
    'su-euro': 'euro',
    'su-exchange': 'arrow-left-right',
    'su-exclamation-circle': 'circle-alert',
    'su-exclamation-triangle': 'triangle-alert',
    'su-exit': 'log-out',
    'su-expand': 'maximize-2',
    'su-expand-vertical': 'chevrons-up-down',
    'su-eye': 'eye',
    'su-filter': 'funnel',
    'su-flag': 'flag',
    'su-flash': 'zap',
    'su-focus': 'locate',
    'su-folder': 'folder',
    'su-folder-permission': 'folder-lock',
    'su-globe': 'globe',
    'su-graduation-cap': 'graduation-cap',
    'su-heart': 'heart',
    'su-hide': 'eye-off',
    'su-house': 'house',
    'su-image': 'image',
    'su-image-minus': 'image-minus',
    'su-image-plus': 'image-plus',
    'su-inbox': 'inbox',
    'su-information': 'info',
    'su-italic': 'italic',
    'su-language': 'languages',
    'su-link': 'link',
    'su-link2': 'link-2',
    'su-list-check': 'list-checks',
    'su-list-ol': 'list-ordered',
    'su-list-ul': 'list',
    'su-lock': 'lock',
    'su-lock-open': 'lock-open',
    'su-magic': 'wand-sparkles',
    'su-map': 'map',
    'su-map-pin': 'map-pin',
    'su-merge': 'git-merge',
    'su-microphone': 'mic',
    'su-minus': 'minus',
    'su-mobile': 'smartphone',
    'su-more': 'grip-vertical',
    'su-more-circle': 'circle-ellipsis',
    'su-more-horizontal': 'ellipsis',
    'su-newspaper': 'newspaper',
    'su-paint': 'paintbrush-vertical',
    'su-pen': 'pen-line',
    'su-percent': 'percent',
    'su-permissions': 'shield-check',
    'su-phone': 'phone',
    'su-plus': 'plus',
    'su-plus-circle': 'circle-plus',
    'su-process': 'history',
    'su-publish': 'file-up',
    'su-save': 'save',
    'su-scissors': 'scissors',
    'su-search': 'search',
    'su-shadow-page': 'files',
    'su-share': 'share',
    'su-sign-out-alt': 'log-out',
    'su-snippet': 'sticky-note',
    'su-sort': 'arrow-up-down',
    'su-square': {icon: 'square', fill: true},
    'su-stick-right': 'arrow-right-to-line',
    'su-strikethrough': 'strikethrough',
    'su-subscript': 'subscript',
    'su-superscript': 'superscript',
    'su-sync': 'refresh-cw',
    'su-tag': 'tag',
    'su-th-large': 'layout-grid',
    'su-th-list': 'layout-list',
    'su-ticket': 'ticket',
    'su-times': 'x',
    'su-toggler-enabled': 'toggle-right',
    'su-trash-alt': 'trash-2',
    'su-tree-list': 'list-tree',
    'su-trophy': 'trophy',
    'su-umbrella': 'umbrella',
    'su-underline': 'underline',
    'su-unlink': 'unlink',
    'su-unpublish': 'file-x',
    'su-upload': 'upload',
    'su-user': 'user',
    'su-user-minus': 'user-minus',
    'su-user-plus': 'user-plus',
    'su-video': 'video',
    'su-webspace': 'target',
    'su-wifi': 'wifi',

    // Font Awesome
    'fa-bullseye': 'target',
    'fa-cube': 'box',
    'fa-file-archive-o': 'file-archive',
    'fa-file-audio-o': 'file-music',
    'fa-file-code-o': 'file-code',
    'fa-file-excel-o': 'file-spreadsheet',
    'fa-file-image-o': 'file-image',
    'fa-file-o': 'file',
    'fa-file-powerpoint-o': 'file-chart-pie',
    'fa-file-text-o': 'file-text',
    'fa-file-video-o': 'file-play',
    'fa-gear': 'settings',
    'fa-image': 'image',
    'fa-newspaper-o': 'newspaper',
    'fa-sliders': 'sliders-vertical',
    'fa-sticky-note-o': 'sticky-note',
    'fa-terminal': 'terminal',
    'fa-user': 'user',
};

function createMarkup(name, definition) {
    const {icon, fill = false} = typeof definition === 'string' ? {icon: definition} : definition;
    const file = path.join(LUCIDE_ICONS_PATH, icon + '.svg');

    if (!fs.existsSync(file)) {
        throw new Error('The Lucide icon "' + icon + '" mapped to "' + name + '" does not exist in lucide-static.');
    }

    let markup = fs.readFileSync(file, 'utf8')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .replace(/> </g, '><')
        .replace(/ \/>/g, '/>')
        .trim();

    // only touch the attributes of the root element, shapes like <rect width="..."> have to stay as they are
    const rootEnd = markup.indexOf('>');
    let root = markup.substring(0, rootEnd).trim()
        .replace(/ (xmlns|width|height)="[^"]*"/g, '')
        .replace(/ stroke-width="[^"]*"/, ' stroke-width="' + STROKE_WIDTH + '"');

    if (fill) {
        root = root.replace(/ fill="[^"]*"/, ' fill="currentColor"');
    }

    markup = root + ' aria-hidden="true" focusable="false"' + markup.substring(rootEnd);

    if (/ (xmlns|width|height)=/.test(root) || !root.includes('stroke-width="' + STROKE_WIDTH + '"')) {
        throw new Error('Unexpected SVG root element for the Lucide icon "' + icon + '".');
    }

    return markup;
}

const lines = Object.keys(ICONS).sort().map((name) => {
    return '    \'' + name + '\': \'' + createMarkup(name, ICONS[name]).replace(/'/g, '\\\'') + '\',';
});

const content = `// @flow
/* eslint-disable max-len */
/*
 * AUTO-GENERATED by scripts/generate-icon-map.js - do not edit by hand.
 *
 * Static SVG markup of Lucide icons (https://lucide.dev, ISC licensed) keyed by the legacy sulu icon font and
 * Font Awesome icon names. To change the mapping edit the table in the generator script and run it again.
 */

const iconSvgMap: {[string]: string} = {
${lines.join('\n')}
};

export default iconSvgMap;
`;

fs.writeFileSync(TARGET_PATH, content);

console.log('Wrote ' + lines.length + ' icons to ' + path.relative(process.cwd(), TARGET_PATH));
