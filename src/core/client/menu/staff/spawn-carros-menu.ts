import alt from 'alt-client'
import * as NativeUI from '@nativeui'
import { NativeMenuItem } from '../menu'
import { EventosServer } from '@lg-shared/enum/id-eventos'

export function spawnCarrosItem(): NativeMenuItem {
    const carros: { [key: string]: string } = {
        Adder: 'adder',
        'T-20': 't20',
        Zentorno: 'zentorno',
        Osiris: 'osiris',
    }

    let spawnItem = new NativeUI.UIMenuListItem(
        'Spawnar carro',
        'Cria um carro para uso exclusivo do staff',
        new NativeUI.ItemsCollection(Object.entries(carros).map(([nome, _]) => new NativeUI.ListItem(nome)))
    )

    let spawnButton = new NativeUI.InstructionalButton('Spawnar carro', NativeUI.Control.PhoneSelect)
    spawnButton.BindToItem(spawnItem)

    return {
        item: spawnItem,
        callback: (item, menu) => {
            if (item.Selected && item instanceof NativeUI.UIMenuListItem && item.SelectedItem != null) {
                alt.emitServer(EventosServer.STAFF_SPAWNAR_CARRO, [carros[item.SelectedItem.DisplayText]])
                menu.Close()
            }
        },
    }
}
