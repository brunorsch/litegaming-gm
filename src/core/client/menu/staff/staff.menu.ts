import * as alt from 'alt-client';
import * as NativeUI from '@nativeui';
import { EventosClient, EventosServer } from '@lg-shared/id-eventos';
import { spawnCarrosItem } from './spawn-carros.menu';
import { bindItems } from '@lg-client/menu/menu';

const menu = new NativeUI.Menu(
    "Staff Menu",
    "Menu do Staffer",
    new NativeUI.Point(50, 50)
);

bindItems(menu,
    spawnCarrosItem(),
);

alt.onServer(EventosClient.MENU_STAFF, () => {
    menu.Open();
});