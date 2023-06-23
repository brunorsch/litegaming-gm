import * as NativeUI from '@nativeui'

export interface NativeMenuItem {
    item: NativeUI.UIMenuItem
    callback: (item: NativeUI.UIMenuItem) => void
}

export function bindItems(menu: NativeUI.Menu, ...itens: NativeMenuItem[]) {
    itens.forEach((item) => {
        menu.AddItem(item.item)

        menu.menu.ItemSelect.on((selectedItem: NativeUI.UIMenuItem) => {
            if (selectedItem == item.item) {
                item.callback(selectedItem)
            }
        })
    })
}
