import Menu from './js/menu';
import Field from './js/field';

import './scss/style.scss';

const field = new Field();
field.createField()

const menu = new Menu(field);
menu.createMenu();